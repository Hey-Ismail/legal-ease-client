"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { BriefcaseBusiness, FileText, History, LayoutDashboard, Menu, Settings, X, Users, ReceiptText, BarChart3, UserRound } from "lucide-react";
import { useSession } from "@/lib/auth-client";

function normalizeRole(role) {
    if (!role) return "user";

    const normalized = String(role).toLowerCase();

    if (normalized === "lawyer") {
        return "lawyer";
    }

    if (normalized === "admin") {
        return "admin";
    }

    return "user";
}

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const role = normalizeRole(session?.user?.role);

    const links = useMemo(() => {
        const overviewLink = {
            label: "Overview",
            href: "/dashboard",
            icon: LayoutDashboard,
        };

        if (role === "lawyer") {
            return [
                overviewLink,
                {
                    label: "Hiring History",
                    href: "/dashboard/lawyer/hiring-history",
                    icon: History,
                },
                {
                    label: "Manage Legal Profile",
                    href: "/dashboard/lawyer/manage-legal-profile",
                    icon: BriefcaseBusiness,
                },
            ];
        }

        if (role === "admin") {
            return [
                overviewLink,
                {
                    label: "Analytics",
                    href: "/dashboard/admin/analytics",
                    icon: BarChart3,
                },
                {
                    label: "Manage Users",
                    href: "/dashboard/admin/manage-users",
                    icon: Users,
                },
                {
                    label: "Transactions",
                    href: "/dashboard/admin/all-transactions",
                    icon: ReceiptText,
                },
            ];
        }

        return [
            overviewLink,
            {
                label: "Hiring History",
                href: "/dashboard/user/hiring-history",
                icon: History,
            },
            {
                label: "Update Profile",
                href: "/dashboard/user/update-profile",
                icon: Settings,
            },
            {
                label: "Comments",
                href: "/dashboard/user/comments",
                icon: FileText,
            },
        ];
    }, [role]);

    const closeMobileNav = () => setMobileNavOpen(false);

    // if (isPending) {
    //     return (
    //         <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
    //             <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
    //                 Loading dashboard...
    //             </div>
    //         </section>
    //     );
    // }

    return (
        <section className="w-full bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
            <div className=" flex min-h-[calc(100vh-80px)] w-full max-w-[1600px] gap-0">
                <aside className="hidden w-70 shrink-0 border-r border-slate-200 bg-[#1A1D2C] px-4 py-6 text-white lg:sticky lg:top-0 lg:flex lg:h-[calc(100vh-80px)] lg:flex-col">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-amber-500 text-slate-950">
                            <UserRound size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                                Dashboard
                            </p>
                            <p className="truncate text-sm font-semibold text-white">
                                {session?.user?.name || session?.user?.email || "Guest"}
                            </p>
                        </div>
                    </div>

                    <nav className="mt-6 flex flex-col gap-2">
                        {links.map((item) => {
                            const active = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                                        ? "bg-amber-500 text-slate-950 shadow-sm"
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <div className="mb-4 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileNavOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                        >
                            <Menu size={16} />
                            Dashboard Menu
                        </button>
                    </div>

                    {children}
                </div>
            </div>

            {mobileNavOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden">
                    <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl">
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="min-w-0">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                                    Dashboard
                                </p>
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {session?.user?.name || session?.user?.email || "Guest"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeMobileNav}
                                className="rounded-full border border-slate-200 p-2 text-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <nav className="mt-4 flex flex-col gap-2">
                            {links.map((item) => {
                                const active = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMobileNav}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </section>
    );
}
