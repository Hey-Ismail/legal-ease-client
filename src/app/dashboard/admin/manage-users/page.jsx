"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyUserId, setBusyUserId] = useState("");

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const response = await fetch("/api/auth/admin/list-users?limit=200", {
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load users.");
                }

                if (isMounted) {
                    setUsers(data.users || []);
                }
            } catch (error) {
                toast.error(error.message || "Failed to load users.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    async function updateRole(userId, role) {
        try {
            setBusyUserId(userId);

            const response = await fetch("/api/auth/admin/update-user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    data: { role },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Failed to update role.");
            }

            setUsers((currentUsers) => currentUsers.map((user) => (user.id === userId ? { ...user, role } : user)));
            toast.success("User role updated.");
        } catch (error) {
            toast.error(error.message || "Failed to update role.");
        } finally {
            setBusyUserId("");
        }
    }

    async function deleteUser(userId) {
        try {
            setBusyUserId(userId);

            const response = await fetch("/api/auth/admin/remove-user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Failed to delete user.");
            }

            setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
            toast.success("User deleted.");
        } catch (error) {
            toast.error(error.message || "Failed to delete user.");
        } finally {
            setBusyUserId("");
        }
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
                    <p className="mt-2 text-slate-600">
                        Change user roles or remove accounts from the platform.
                    </p>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-slate-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {loading ? (
                            <tr>
                                <td className="px-4 py-4" colSpan={4}>Loading users...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td className="px-4 py-4" colSpan={4}>No users found.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-4 font-medium text-slate-900">{user.name || "Unnamed"}</td>
                                    <td className="px-4 py-4">{user.email}</td>
                                    <td className="px-4 py-4 capitalize">{user.role || "user"}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                disabled={busyUserId === user.id}
                                                onClick={() => updateRole(user.id, user.role === "lawyer" ? "user" : "lawyer")}
                                                className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Change Role
                                            </button>

                                            <button
                                                type="button"
                                                disabled={busyUserId === user.id}
                                                onClick={() => deleteUser(user.id)}
                                                className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Delete User
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}