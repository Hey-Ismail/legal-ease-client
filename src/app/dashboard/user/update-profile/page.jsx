"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UpdateProfilePage() {
    const { data: session } = useSession();

    const [form, setForm] = useState({
        fullName: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        toast.success("Name updated locally. Connect this form to your update API.");
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Update Profile</h1>
            <p className="mt-2 text-slate-600">
                Update your name only.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
                <div>
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName === "" ? (session?.user?.name || "") : form.fullName}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                        placeholder="Enter your full name"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                    Update Name
                </button>
            </form>
        </section>
    );
}
