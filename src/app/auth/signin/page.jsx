"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scale } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignInPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signIn.email({
                email: form.email,
                password: form.password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password.");
                return;
            }

            toast.success("Login successful!");

            const nextRole = String(data?.user?.role || "user").toLowerCase();

            if (nextRole === "admin") {
                router.push("/dashboard/admin/analytics");
            } else if (nextRole === "lawyer") {
                router.push("/dashboard/lawyer/hiring-history");
            } else {
                router.push("/");
            }

            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleLogin() {
        toast.info("Google sign-in is currently unavailable. Please sign up with email and password instead.");
    }



    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-200 p-10">

                <div className="flex justify-center">
                    <div className="bg-amber-500 p-4 rounded-2xl">
                        <Scale className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mt-6">
                    Welcome Back
                </h1>

                <p className="text-center text-slate-500 mt-2">
                    Login to your LegalEase account
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5 mt-10"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>

                        <div className="flex justify-between">

                            <label className="font-medium">
                                Password
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-amber-500 hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-amber-500 hover:bg-amber-600"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="flex items-center gap-3 my-8">
                    <div className="h-px bg-slate-300 flex-1"></div>
                    <span className="text-slate-400 text-sm">OR</span>
                    <div className="h-px bg-slate-300 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full border border-slate-300 rounded-xl py-3 hover:bg-slate-100 transition font-medium"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-8 text-slate-500">
                    Dont have an account?

                    <Link
                        href="/auth/signup"
                        className="ml-2 text-amber-500 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </section>
    );
}