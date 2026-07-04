import Link from "next/link";
import {
    Briefcase,
    Shield,
    HeartHandshake,
    Building2,
    Landmark,
    Scale,
    FileText,
    Users,
} from "lucide-react";

const categories = [
    {
        name: "Corporate Law",
        icon: Building2,
        slug: "Corporate Law",
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "Criminal Law",
        icon: Shield,
        slug: "Criminal Law",
        color: "bg-red-100 text-red-600",
    },
    {
        name: "Family Law",
        icon: HeartHandshake,
        slug: "Family Law",
        color: "bg-pink-100 text-pink-600",
    },
    {
        name: "Immigration Law",
        icon: Landmark,
        slug: "Immigration Law",
        color: "bg-green-100 text-green-600",
    },
    {
        name: "Business Law",
        icon: Briefcase,
        slug: "Business Law",
        color: "bg-amber-100 text-amber-600",
    },
    {
        name: "Civil Law",
        icon: Scale,
        slug: "Civil Law",
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        name: "Tax Law",
        icon: FileText,
        slug: "Tax Law",
        color: "bg-cyan-100 text-cyan-600",
    },
    {
        name: "Employment Law",
        icon: Users,
        slug: "Employment Law",
        color: "bg-purple-100 text-purple-600",
    },
];

export default function LegalCategories() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">
                    <p className="text-amber-500 font-semibold uppercase tracking-widest">
                        Practice Areas
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-slate-900">
                        Legal Categories
                    </h2>

                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Browse lawyers by their area of expertise and quickly find the
                        right legal professional for your needs.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.name}
                                href={`/lawyers?category=${encodeURIComponent(category.slug)}`}
                                className="group bg-white rounded-3xl border border-slate-200 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${category.color}`}
                                >
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-amber-500 transition">
                                    {category.name}
                                </h3>

                                <p className="mt-2 text-slate-500 text-sm">
                                    Explore expert lawyers in this legal field.
                                </p>

                                <span className="inline-flex items-center mt-6 text-amber-500 font-semibold">
                                    Browse Lawyers →
                                </span>
                            </Link>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}