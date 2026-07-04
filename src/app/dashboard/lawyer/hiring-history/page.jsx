"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LawyerHiringHistoryPage() {
    const { data: session } = useSession();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadRequests() {
            if (!session?.user?.email) {
                setRequests([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(`/api/hiring?lawyerEmail=${encodeURIComponent(session.user.email)}`, {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load requests.");
                }

                if (active) {
                    setRequests(data.records || []);
                }
            } catch (error) {
                toast.error(error.message || "Failed to load requests.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadRequests();

        return () => {
            active = false;
        };
    }, [session?.user?.email]);

    if (!session?.user?.email) {
        return (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900">Hiring Requests</h1>
                <p className="mt-2 text-slate-600">Sign in to see your hiring requests.</p>
            </section>
        );
    }

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Hiring Requests</h1>
            <p className="mt-2 text-slate-600">
                Review the hiring records associated with your lawyer account.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left text-slate-700">
                        <tr>
                            <th className="px-4 py-3">Client Name</th>
                            <th className="px-4 py-3">Requested Lawyer</th>
                            <th className="px-4 py-3">Request Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td className="px-4 py-4 text-slate-500" colSpan={4}>Loading requests...</td>
                            </tr>
                        ) : requests.length > 0 ? (
                            requests.map((row) => (
                                <tr key={row.id} className="border-t border-slate-200">
                                    <td className="px-4 py-3 font-medium text-slate-900">{row.userName}</td>
                                    <td className="px-4 py-3 text-slate-700">{row.lawyerName}</td>
                                    <td className="px-4 py-3 text-slate-700">{new Date(row.hiredAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 capitalize text-slate-700">{row.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-4 text-slate-500" colSpan={4}>No requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
