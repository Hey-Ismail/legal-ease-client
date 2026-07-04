"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const initialServices = [
    {
        id: "s-1",
        name: "Family Consultation",
        bio: "Guidance for divorce, custody and mediation matters.",
        fee: 120,
        specialization: "Family Law",
        image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf",
    },
    {
        id: "s-2",
        name: "Criminal Case Review",
        bio: "Case review, defense planning and hearing preparation.",
        fee: 190,
        specialization: "Criminal Defense",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    },
];

const emptyForm = {
    name: "",
    bio: "",
    fee: "",
    specialization: "",
    image: "",
};

export default function ManageLegalProfilePage() {
    const [services, setServices] = useState(initialServices);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!form.name || !form.bio || !form.fee || !form.specialization) {
            toast.error("Please fill all required fields.");
            return;
        }

        if (editingId) {
            setServices((prev) =>
                prev.map((item) =>
                    item.id === editingId
                        ? {
                            ...item,
                            ...form,
                            fee: Number(form.fee),
                        }
                        : item
                )
            );

            toast.success("Service updated.");
        } else {
            setServices((prev) => [
                ...prev,
                {
                    id: `s-${Date.now()}`,
                    ...form,
                    fee: Number(form.fee),
                },
            ]);

            toast.success("Service added.");
        }

        setForm(emptyForm);
        setEditingId("");
    }

    function onEdit(service) {
        setEditingId(service.id);
        setForm({
            name: service.name,
            bio: service.bio,
            fee: String(service.fee),
            specialization: service.specialization,
            image: service.image,
        });
    }

    function onDelete(id) {
        setServices((prev) => prev.filter((item) => item.id !== id));
        if (editingId === id) {
            setEditingId("");
            setForm(emptyForm);
        }
        toast.success("Service deleted.");
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Manage Legal Profile</h1>
            <p className="mt-2 text-slate-600">
                Add, edit, and delete your legal services shown on your details page.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-slate-700">Service Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500"
                        placeholder="Service title"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">Specialization</label>
                    <input
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500"
                        placeholder="Family Law"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">Fee</label>
                    <input
                        type="number"
                        min="0"
                        name="fee"
                        value={form.fee}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500"
                        placeholder="120"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500"
                        placeholder="https://..."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Bio</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={4}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500"
                        placeholder="Describe this service"
                    />
                </div>

                <div className="md:col-span-2 flex gap-2">
                    <button
                        type="submit"
                        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        {editingId ? "Update Service" : "Add Service"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId("");
                                setForm(emptyForm);
                            }}
                            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left text-slate-700">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Specialization</th>
                            <th className="px-4 py-3">Fee</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="border-t border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">{service.name}</td>
                                <td className="px-4 py-3 text-slate-700">{service.specialization}</td>
                                <td className="px-4 py-3 text-slate-700">${service.fee}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(service)}
                                            className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete(service.id)}
                                            className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
