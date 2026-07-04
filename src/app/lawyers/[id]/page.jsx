import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, GraduationCap, Briefcase, Star, Globe, CheckCircle } from "lucide-react";
import HireLawyerModal from "@/components/HireLawyerModal";
import LawyerComments from "@/components/LawyerComments";
import { getLawyerById } from "@/lib/lawyers";

export default async function LawyerDetailsPage({ params }) {
    const { id } = await params;
    const lawyer = await getLawyerById(id);

    if (!lawyer) {
        notFound();
    }

    const successRate = lawyer.totalCases > 0
        ? Math.round((lawyer.successfulCases / lawyer.totalCases) * 100)
        : 0;

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[360px_1fr] lg:p-10">
                    <div className="relative h-105 overflow-hidden rounded-3xl">
                        <Image
                            src={lawyer.image}
                            alt={lawyer.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
                                {lawyer.name}
                            </h1>

                            {lawyer.verified && (
                                <CheckCircle className="text-blue-600" size={28} />
                            )}

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${lawyer.availability === "Available"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {lawyer.availability}
                            </span>
                        </div>

                        <h2 className="mt-3 text-2xl font-semibold text-amber-500">
                            {lawyer.specialization}
                        </h2>

                        <div className="mt-8 flex flex-wrap gap-8 text-slate-600">
                            <div className="flex items-center gap-2">
                                <Star className="fill-yellow-500 text-yellow-500" />
                                {lawyer.rating} ({lawyer.reviewCount} Reviews)
                            </div>

                            <div className="flex items-center gap-2">
                                <Briefcase />
                                {lawyer.experience} Years Experience
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin />
                                {lawyer.location}
                            </div>
                        </div>

                        <p className="mt-8 text-lg leading-8 text-slate-600">
                            {lawyer.bio}
                        </p>

                        <HireLawyerModal className="mt-10 w-56" lawyer={lawyer} />
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="text-slate-500">Consultation Fee</p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">৳ {lawyer.consultationFee}</h3>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="text-slate-500">Total Cases</p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">{lawyer.totalCases}</h3>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="text-slate-500">Success Rate</p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">{successRate}%</h3>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="text-slate-500">Hire Count</p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">{lawyer.hireCount}</h3>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                    <h2 className="mb-8 text-3xl font-bold text-slate-900">Professional Information</h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="flex gap-4">
                            <Mail className="text-amber-500" />
                            <div>
                                <p className="text-slate-500">Email</p>
                                <p className="font-semibold text-slate-900">{lawyer.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Phone className="text-amber-500" />
                            <div>
                                <p className="text-slate-500">Phone</p>
                                <p className="font-semibold text-slate-900">{lawyer.phone}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <GraduationCap className="text-amber-500" />
                            <div>
                                <p className="text-slate-500">Education</p>
                                <p className="font-semibold text-slate-900">{lawyer.education}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Globe className="text-amber-500" />
                            <div>
                                <p className="text-slate-500">Languages</p>
                                <p className="font-semibold text-slate-900">{lawyer.languages.join(", ")}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Briefcase className="text-amber-500" />
                            <div>
                                <p className="text-slate-500">Joined</p>
                                <p className="font-semibold text-slate-900">{lawyer.joinedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <LawyerComments lawyer={lawyer} />
            </div>
        </section>
    );
}