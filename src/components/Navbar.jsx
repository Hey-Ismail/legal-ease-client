"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    Menu,
    X,
    Search,
    Scale,
    ChevronDown,
} from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Browse Lawyers",
            href: "/src/app/lawyers",
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

                        {/* Dashboard */}

                        <div className="relative group cursor-pointer">

                            <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-500">

                                Dashboard

                                <ChevronDown size={18} />

                            </button>

                            <div className="absolute top-10 hidden group-hover:block bg-slate-900 rounded-xl shadow-xl w-56 border border-slate-700 overflow-hidden">

                                <Link
                                    href="/dashboard/profile"
                                    className="block px-5 py-3 hover:bg-slate-800 text-gray-300"
                                >
                                    Profile
                                </Link>

                                <Link
                                    href="/dashboard/history"
                                    className="block px-5 py-3 hover:bg-slate-800 text-gray-300"
                                >
                                    Hiring History
                                </Link>

                                <Link
                                    href="/dashboard/comments"
                                    className="block px-5 py-3 hover:bg-slate-800 text-gray-300"
                                >
                                    Comments
                                </Link>

                            </div>

                        </div>

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

                        <Link
                            href="/login"
                            className="text-gray-300 hover:text-yellow-500 transition"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-semibold transition"
                        >
                            Register
                        </Link>

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

                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                        <Link href="/login">
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="bg-yellow-500 text-slate-900 rounded-lg py-3 text-center font-semibold"
                        >
                            Register
                        </Link>

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