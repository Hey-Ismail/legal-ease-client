"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
    return (
        <div className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-3xl text-red-500">
                    !
                </div>

                <h1 className="mt-6 text-4xl font-bold text-slate-900">
                    Something went wrong
                </h1>

                <p className="mt-4 text-slate-600">
                    {error?.message || "An unexpected error occurred while loading this page."}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}