import LawyerDirectory from "@/components/LawyerDirectory";
import { getLawyers } from "@/lib/lawyers";

export default async function LawyersPage() {
    const lawyers = await getLawyers();

    return (
        <section className="mx-auto max-w-7xl px-5 py-16">
            <div className="text-center">
                {/* <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold text-amber-700">
                    Trusted legal experts
                </p> */}

                <h1 className="mt-5 text-5xl font-bold text-slate-900">
                    Browse <span className="text-amber-500">Lawyers</span>
                </h1>

                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
                    Search by name or specialization, filter by availability and fee, and move through results with pagination.
                </p>
            </div>

            <LawyerDirectory lawyers={lawyers} />
        </section>
    );
}