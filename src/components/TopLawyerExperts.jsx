import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getTopLawyers() {
    const res = await fetch(`${BASE_URL}/TopLawyerExperts`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch top lawyers");
    }

    return res.json();
}

export default async function TopLawyerExperts() {
    let lawyers = [];

    try {
        lawyers = await getTopLawyers();
    } catch (error) {
        console.error("TopLawyerExperts fetch failed:", error?.message);
        return null;
    }

    if (!lawyers || lawyers.length === 0) {
        return null;
    }

    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Meet our top legal experts
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Our most trusted and highly{" "}
                        <span className="px-1 rounded-sm bg-green-300">hired</span> lawyers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {lawyers.map((lawyer) => (
                        <div
                            key={lawyer._id}
                            className="relative bg-white rounded-2xl shadow-lg hover:-translate-y-2 duration-300 overflow-hidden"
                        >
                            {/* Badge – positioned top right */}
                            <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium text-sm z-10">
                                {lawyer.totalHires} Successful Hires
                            </div>

                            <div className="p-8 flex flex-col items-center">
                                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-400">
                                    <Image
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="mt-6 text-center">
                                    <h3 className="text-2xl font-bold">{lawyer.name}</h3>
                                    <p className="text-slate-500 mt-1">{lawyer.specialization}</p>

                                    <Link
                                        href={`/lawyers/${lawyer._id}`}
                                        className="mt-6 inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}