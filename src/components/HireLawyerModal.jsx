"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function HireLawyerModal({ lawyer, className = "" }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const lawyerId = String(lawyer?._id || lawyer?.id || "");

    async function confirmHire() {
        if (!session?.user?.email) {
            toast.error("Please log in to hire a lawyer.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch("/api/hiring", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    userName: session.user.name,
                    lawyerId,
                    lawyerName: lawyer?.name,
                    lawyerEmail: lawyer?.email,
                    lawyerSpecialization: lawyer?.specialization,
                    fee: lawyer?.consultationFee,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Hiring request failed.");
            }

            toast.success("Hiring request sent!");
            setOpen(false);
        } catch (error) {
            toast.error(error.message || "Hiring request failed.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`rounded-2xl bg-amber-500 py-4 px-8 font-semibold text-white hover:bg-amber-600 transition ${className}`}
            >
                Hire Lawyer
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

                    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Confirm Hiring
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Are you sure you want to hire
                            <span className="font-bold">
                                {" "}{lawyer.name}
                            </span>
                            ?
                        </p>

                        <div className="my-6 rounded-2xl bg-slate-100 p-5">

                            <div className="flex justify-between">
                                <span>Specialization</span>
                                <span>{lawyer.specialization}</span>
                            </div>

                            <div className="flex justify-between mt-3">
                                <span>Consultation Fee</span>
                                <span>${lawyer.consultationFee}</span>
                            </div>

                            <div className="flex justify-between mt-3">
                                <span>Location</span>
                                <span>{lawyer.location}</span>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-xl border px-5 py-3"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmHire}
                                disabled={submitting}
                                className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? "Sending..." : "Confirm"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}