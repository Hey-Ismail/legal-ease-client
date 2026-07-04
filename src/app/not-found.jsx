import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="text-7xl font-black text-amber-500">404</div>

                <h1 className="mt-6 text-4xl font-bold text-slate-900">
                    Page Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    Sorry, the requested page could not be found. Please return to the home page and try again.
                </p>

                <Link
                    href="/"
                    className="inline-flex mt-10 rounded-full bg-amber-500 px-8 py-4 font-semibold text-white transition hover:bg-amber-600"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}