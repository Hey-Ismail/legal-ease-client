"use client";

import { useState } from "react";

export default function HireLawyerModal({ lawyer, className = "" }) {
    const [open, setOpen] = useState(false);

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
                                onClick={() => {
                                    alert("Hiring request sent!");
                                    setOpen(false);
                                }}
                                className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}