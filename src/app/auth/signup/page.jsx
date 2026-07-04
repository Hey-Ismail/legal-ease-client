"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scale } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const FIXED_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@legalease.com";
const FIXED_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin@123";

export default function SignUpPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    const router = useRouter();

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

            const role = String(form.role || "user").toLowerCase();
            const email = form.email;
            const password = form.password;

            if (!passwordRegex.test(password)) {
                toast.error(
                    "Password must be at least 6 characters and include an uppercase letter, lowercase letter and a number."
                );
                return;
            }

            if (form.password !== form.confirmPassword) {
                toast.error("Passwords do not match.");
                return;
            }

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email,
                    password,
                    role,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message || "Registration failed.");
            }

            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Registration failed.");
                return;
            }

            toast.success("Account created successfully!");

            router.push("/");
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignUp = async () => {

        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        console.log(data);
    };
    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">

            <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-xl p-10">

                <div className="flex justify-center">

                    <div className="bg-amber-500 p-4 rounded-2xl">
                        <Scale className="w-8 h-8 text-white" />
                    </div>

                </div>

                <h1 className="text-4xl font-bold text-center mt-6">
                    Create Account
                </h1>

                <p className="text-center text-slate-500 mt-2">
                    Join LegalEase and connect with trusted legal professionals.
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5 mt-10"
                >

                    <div>

                        <label className="font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />
                        {form.role === "admin" && (
                            <p className="mt-2 text-xs text-slate-500">
                                Admin credentials must match the approved admin account.
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />
                        {form.role === "admin" && (
                            <p className="mt-2 text-xs text-slate-500">
                                Enter the approved admin password manually.
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Register As
                        </label>

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        >
                            <option value="user">
                                User (Client)
                            </option>

                            <option value="lawyer">
                                Lawyer
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <div className="flex items-center gap-3 my-8">

                    <div className="h-px bg-slate-300 flex-1"></div>

                    <span className="text-slate-400 text-sm">
                        OR
                    </span>

                    <div className="h-px bg-slate-300 flex-1"></div>

                </div>

                <button
                    onClick={handleGoogleSignUp}
                    className="w-full border border-slate-300 rounded-xl py-3 font-semibold hover:bg-slate-100 transition"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-8 text-slate-500">

                    Already have an account?

                    <Link
                        href="/auth/signin"
                        className="text-amber-500 font-semibold ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </section>
    );
}
