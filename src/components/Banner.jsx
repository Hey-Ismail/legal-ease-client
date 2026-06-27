"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
    Star,
    ArrowRight,
    BriefcaseBusiness,
    MapPin,
} from "lucide-react";

export default function Banner() {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/lawyers")
            .then((res) => {
                setLawyers(res.data.slice(0, 4));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="h-[85vh] flex items-center justify-center bg-slate-900">
                <span className="loading loading-spinner loading-lg text-amber-500"></span>
            </section>
        );
    }

    return (
        <section className="bg-slate-900">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop
            >
                {lawyers.map((lawyer) => (
                    <SwiperSlide key={lawyer._id}>
                        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
                            {/* LEFT – straightforward message */}
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    Find the right lawyer
                                    <br />
                                    <span className="text-amber-400">for your situation</span>
                                </h1>
                                <p className="text-slate-300 text-lg mt-6 max-w-lg leading-relaxed">
                                    Connect with verified legal professionals across corporate,
                                    criminal, immigration, family and business law.
                                </p>

                                <div className="flex gap-4 mt-8">
                                    <Link
                                        href="/browse-lawyers"
                                        className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
                                    >
                                        Browse lawyers
                                        <ArrowRight size={18} />
                                    </Link>
                                    <button className="border border-slate-500 text-white px-6 py-3.5 rounded-lg hover:border-amber-400 transition-colors">
                                        How it works
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT – simple, trust-building card */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                                    {/* Image */}
                                    <div className="h-56 w-full overflow-hidden">
                                        <img
                                            src={lawyer.image}
                                            alt={lawyer.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    {lawyer.name}
                                                </h2>
                                                <p className="text-slate-500 flex items-center gap-1.5 mt-1 text-sm">
                                                    <BriefcaseBusiness size={16} />
                                                    {lawyer.specialization}
                                                </p>
                                                <p className="text-slate-500 flex items-center gap-1.5 mt-1 text-sm">
                                                    <MapPin size={16} />
                                                    {lawyer.location}
                                                </p>
                                            </div>

                                            {lawyer.availability && (
                                                <span
                                                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${lawyer.availability === "Available"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-red-50 text-red-700"
                                                        }`}
                                                >
                                                    {lawyer.availability}
                                                </span>
                                            )}
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1.5 mt-4">
                                            <Star size={16} fill="#F59E0B" className="text-amber-500" />
                                            <span className="text-slate-700 font-medium">
                                                {lawyer.rating}
                                            </span>
                                            <span className="text-slate-400 text-sm">
                                                ({lawyer.reviewCount} reviews)
                                            </span>
                                        </div>

                                        {/* Fee + CTA */}
                                        <div className="mt-6 flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 text-xs">Consultation fee</p>
                                                <p className="text-lg font-bold text-slate-800">
                                                    ${lawyer.consultationFee}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/lawyers/${lawyer._id}`}
                                                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                View profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}