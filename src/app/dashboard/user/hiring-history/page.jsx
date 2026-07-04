"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

function statusStyles(status) {
    if (status === "accepted") return "bg-emerald-100 text-emerald-700";
    if (status === "rejected") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700";
}

export default function UserHiringHistoryPage() {
    const { data: session } = useSession();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payingId, setPayingId] = useState(null);

    useEffect(() => {
        let active = true;

        async function loadRecords() {
            if (!session?.user?.email) {
                setRecords([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(`/api/hiring?userEmail=${encodeURIComponent(session.user.email)}`, {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load hiring history.");
                }

                if (active) {
                    setRecords(data.records || []);
                }
            } catch (error) {
                toast.error(error.message || "Failed to load hiring history.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadRecords();

        return () => {
            active = false;
        };
    }, [session?.user?.email]);

    async function handlePay(row) {
        if (!session?.user?.email || !row?.id) {
            return;
        }

        try {
            setPayingId(row.id);

            const response = await fetch("/api/hiring", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: row.id,
                    userEmail: session.user.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Payment failed. Please try again.");
            }

            setRecords((prev) =>
                prev.map((item) => (item.id === row.id ? data.record : item))
            );

            toast.success("Payment completed successfully.");
        } catch (error) {
            toast.error(error.message || "Payment failed. Please try again.");
        } finally {
            setPayingId(null);
        }
    }

    const totalSpend = useMemo(() => {
        return records
            .filter((row) => row.status === "accepted")
            .reduce((sum, row) => sum + Number(row.fee || 0), 0);
    }, [records]);

    if (!session?.user?.email) {
        return (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900">Hiring History</h1>
                <p className="mt-2 text-slate-600">Sign in to view your hiring history.</p>
            </section>
        );
    }

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Hiring History</h1>
            <p className="mt-2 text-slate-600">
                Track your lawyer hiring requests and follow the records that unlock commenting.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Accepted requests total: <span className="font-semibold">৳ {totalSpend}</span>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left text-slate-700">
                        <tr>
                            <th className="px-4 py-3">Lawyer Name</th>
                            <th className="px-4 py-3">Specialization</th>
                            <th className="px-4 py-3">Fee</th>
                            <th className="px-4 py-3">Hired At</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Payment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="px-4 py-4 text-slate-500" colSpan={6}>Loading records...</td>
                            </tr>
                        ) : records.length > 0 ? (
                            records.map((row) => (
                                <tr key={row.id} className="border-t border-slate-200">
                                    <td className="px-4 py-3 font-medium text-slate-900">{row.lawyerName}</td>
                                    <td className="px-4 py-3 text-slate-700">{row.lawyerSpecialization}</td>
                                    <td className="px-4 py-3 text-slate-700">৳ {row.fee}</td>
                                    <td className="px-4 py-3 text-slate-700">{new Date(row.hiredAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles(row.status)}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {row.status === "accepted" ? (
                                            row.isPaid ? (
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handlePay(row)}
                                                    disabled={payingId === row.id}
                                                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {payingId === row.id ? "Paying..." : `Pay ৳ ${row.fee}`}
                                                </button>
                                            )
                                        ) : (
                                            <span className="text-xs text-slate-500">Not available</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-slate-500" colSpan={6}>No hiring records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
