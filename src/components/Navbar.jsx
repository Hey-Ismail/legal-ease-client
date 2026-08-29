"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";

import ThemeToggle from "./ThemeToggle";
import {
    Menu,
    X,
    Search,
    Scale,
    ChevronDown,
    User,
    LogOut,
} from "lucide-react";

function normalizeRole(role) {
    if (!role) return "user";

    const normalized = String(role).toLowerCase();

    if (normalized === "lawyer") return "lawyer";
    if (normalized === "admin") return "admin";

    return "user";
}

function getDashboardHref(role) {
    if (role === "lawyer") return "/dashboard/lawyer/hiring-history";
    if (role === "admin") return "/dashboard/admin/analytics";

    return "/dashboard/user/hiring-history";
}

function getDashboardLabel(role) {
    if (role === "lawyer") return "Lawyer Dashboard";
    if (role === "admin") return "Admin Dashboard";

    return "User Dashboard";
}

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const isLoggedIn = Boolean(session?.user);
    const role = normalizeRole(session?.user?.role);
    const dashboardHref = getDashboardHref(role);
    const dashboardLabel = getDashboardLabel(role);
    const displayName = session?.user?.name || session?.user?.email || "Profile";

    const handleLogout = async () => {
        await signOut();
        setProfileOpen(false);
        setOpen(false);
        router.push("/");
    };

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Browse Lawyers",
            href: "/lawyers",
        },
    ];

    const dashboardLinks = role === "admin" ? [
        {
            name: "Analytics",
            href: "/dashboard/admin/analytics",
        },
        {
            name: "Users",
            href: "/dashboard/admin/manage-users",
        },
        {
            name: "Transactions",
            href: "/dashboard/admin/all-transactions",
        },
    ] : role === "lawyer" ? [
        {
            name: "Hiring Requests",
            href: "/dashboard/lawyer/hiring-history",
        },
        {
            name: "Manage Profile",
            href: "/dashboard/lawyer/manage-legal-profile",
        },
    ] : [
        {
            name: "Hiring History",
            href: "/dashboard/user/hiring-history",
        },
        {
            name: "Update Profile",
            href: "/dashboard/user/update-profile",
        },
        {
            name: "Comments",
            href: "/dashboard/user/comments",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center justify-between h-20">

                    {/* Logo */}

                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="bg-yellow-500 p-2 rounded-xl">
                            <Scale className="w-6 h-6 text-slate-900" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                LegalEase
                            </h1>

                            <p className="text-xs text-gray-400">
                                Online Lawyer Hiring
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}

                    <div className="hidden lg:flex items-center gap-8">

                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`transition font-medium ${pathname === item.href
                                    ? "text-yellow-500"
                                    : "text-gray-300 hover:text-yellow-500"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {isLoggedIn && (
                            <Link
                                href={dashboardHref}
                                className={`transition font-semibold ${pathname.startsWith("/dashboard")
                                    ? "text-yellow-500"
                                    : "text-gray-300 hover:text-yellow-500"
                                    }`}
                            >
                                {dashboardLabel}
                            </Link>
                        )}

                    </div>

                    {/* Search */}

                    <div className="hidden xl:flex">

                        <div className="relative">

                            <Search
                                className="absolute left-4 top-3.5 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search lawyer..."
                                className="pl-11 pr-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-500 w-72"
                            />

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="hidden lg:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen((prev) => !prev)}
                                    className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-gray-200 hover:border-yellow-500 hover:text-yellow-500 transition"
                                >
                                    <User size={18} />
                                    <span className="max-w-40 truncate">{displayName}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 top-12 bg-slate-900 rounded-xl shadow-xl w-56 border border-slate-700 overflow-hidden">
                                        {/* <Link
                                            href="/dashboard/profile"
                                            className="block px-5 py-3 hover:bg-slate-800 text-gray-300"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            My Profile
                                        </Link> */}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full text-left px-5 py-3 hover:bg-slate-800 text-red-400 flex items-center gap-2"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="text-gray-300 hover:text-yellow-500 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/auth/signup"
                                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-semibold transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Button */}

                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden text-white"
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {open && (
                <div className="lg:hidden bg-slate-950 border-t border-slate-800">

                    <div className="flex flex-col p-6 gap-5">

                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`${pathname === item.href
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link href="/dashboard" onClick={() => setOpen(false)}>
                            Dashboard
                        </Link>

                        {isLoggedIn ? (
                            <>
                                <Link href={dashboardHref} onClick={() => setOpen(false)}>
                                    {dashboardLabel}
                                </Link>

                                {dashboardLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={pathname === item.href ? "text-yellow-500" : ""}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="text-left text-red-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" onClick={() => setOpen(false)}>
                                    Login
                                </Link>

                                <Link
                                    href="/auth/signup"
                                    onClick={() => setOpen(false)}
                                    className="bg-yellow-500 text-slate-900 rounded-lg py-3 text-center font-semibold"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {/* Mobile Search */}

                        <div className="relative mt-2">

                            <Search
                                className="absolute left-4 top-3.5 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search lawyers..."
                                className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-white"
                            />

                        </div>

                    </div>

                </div>
            )}
        </nav>
    );
}