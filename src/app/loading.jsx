export default function Loading() {
    return (
        <div className="min-h-screen px-6 py-20">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />

                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Loading LegalEase...
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Preparing the latest lawyers, dashboard data, and account state.
                    </p>
                </div>

                <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="h-56 animate-pulse rounded-2xl bg-slate-100" />
                            <div className="mt-4 space-y-3">
                                <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
                                <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-100" />
                                <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}