"use client";

import { useEffect, useMemo, useState } from "react";

function roleCount(users, role) {
    return users.filter((user) => String(user.role || "user").toLowerCase() === role).length;
}

export default function AdminAnalyticsPage() {
    const [users, setUsers] = useState([]);
    const [hires, setHires] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function loadData() {
            const [usersResponse, hiresResponse, commentsResponse] = await Promise.all([
                fetch("/api/auth/admin/list-users?limit=200", { credentials: "include" }),
                fetch("/api/hiring", { cache: "no-store" }),
                fetch("/api/comments", { cache: "no-store" }),
            ]);

            const [usersData, hiresData, commentsData] = await Promise.all([
                usersResponse.json(),
                hiresResponse.json(),
                commentsResponse.json(),
            ]);

            setUsers(usersData.users || []);
            setHires(hiresData.records || []);
            setComments(commentsData.comments || []);
        }

        void loadData();
    }, []);

    const cards = useMemo(() => {
        const lawyerCount = roleCount(users, "lawyer");
        const adminCount = roleCount(users, "admin");
        const acceptedHires = hires.filter((hire) => hire.status === "accepted").length;

        return [
            { label: "Total Users", value: String(users.length) },
            { label: "Total Lawyers", value: String(lawyerCount) },
            { label: "Total Admins", value: String(adminCount) },
            { label: "Total Hires", value: String(acceptedHires) },
        ];
    }, [users, hires]);

    const chartBars = useMemo(() => {
        const lawyerCount = roleCount(users, "lawyer");
        const adminCount = roleCount(users, "admin");
        const userCount = roleCount(users, "user");
        const acceptedHires = hires.filter((hire) => hire.status === "accepted").length;

        return [
            { label: "Users", value: userCount, color: "bg-slate-900" },
            { label: "Lawyers", value: lawyerCount, color: "bg-amber-500" },
            { label: "Admins", value: adminCount, color: "bg-emerald-500" },
            { label: "Hires", value: acceptedHires, color: "bg-sky-500" },
            { label: "Comments", value: comments.length, color: "bg-rose-500" },
        ];
    }, [users, hires, comments]);

    const maxBarValue = Math.max(1, ...chartBars.map((bar) => bar.value));
    //123456789Jj
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
                    <p className="mt-2 text-slate-600">
                        Current platform counts for users, hiring, and comments.
                    </p>
                </div>

                {/* <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                    Responsive full-width dashboard
                </div> */}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-slate-900">Platform Activity Chart</h2>
                    <p className="text-sm text-slate-500">Users, lawyers, admins, hires, and comments</p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-5">
                    {chartBars.map((bar) => (
                        <div key={bar.label} className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
                            <div className="flex items-end gap-3">
                                <div className="flex h-40 flex-1 items-end rounded-2xl bg-slate-100 px-3 py-3">
                                    <div
                                        className={`w-full rounded-xl ${bar.color}`}
                                        style={{ height: `${(bar.value / maxBarValue) * 100}%` }}
                                    />
                                </div>
                                <div className="pb-1 text-right">
                                    <p className="text-2xl font-bold text-slate-900">{bar.value}</p>
                                    <p className="text-sm text-slate-500">{bar.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}