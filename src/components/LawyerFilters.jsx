"use client";

import {
    Search,
    SlidersHorizontal,
    BriefcaseBusiness,
    ArrowDownUp,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

export default function LawyerFilters() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "";

    function handleSort(value) {

        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        router.push(`/lawyers?${params.toString()}`);
    }

    return (

        <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-3">

            <div className="grid lg:grid-cols-[2fr_1.2fr_1fr_1fr]">

                <div className="flex items-center gap-3 px-5 border-r border-slate-200">

                    <Search
                        size={22}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search lawyers..."
                        className="w-full py-4 outline-none bg-transparent"
                    />

                </div>

                <div className="flex items-center gap-3 px-5 border-r border-slate-200">

                    <BriefcaseBusiness
                        size={22}
                        className="text-amber-500"
                    />

                    <select
                        onChange={(e) => {
                            const params = new URLSearchParams(searchParams);

                            if (e.target.value) {
                                params.set("specialization", e.target.value);
                            } else {
                                params.delete("specialization");
                            }

                            router.push(`/lawyers?${params.toString()}`);
                        }}
                    >
                        <option value="">All Categories</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="Criminal Law">Criminal Law</option>
                        <option value="Family Law">Family Law</option>
                        <option value="Immigration Law">Immigration Law</option>
                    </select>

                </div>

                <div className="flex items-center gap-3 px-5 border-r border-slate-200">

                    <SlidersHorizontal
                        size={22}
                        className="text-amber-500"
                    />

                    <select
                        onChange={(e) => {
                            const params = new URLSearchParams(searchParams);

                            if (e.target.value) {
                                params.set("availability", e.target.value);
                            } else {
                                params.delete("availability");
                            }

                            router.push(`/lawyers?${params.toString()}`);
                        }}
                    >
                        <option value="">Status</option>
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                    </select>

                </div>

                <div className="flex items-center gap-3 px-5">

                    <ArrowDownUp
                        size={22}
                        className="text-amber-500"
                    />

                    <select
                        value={currentSort}
                        onChange={(e) => handleSort(e.target.value)}
                        className="w-full py-4 outline-none bg-transparent"
                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="rating">
                            Highest Rating
                        </option>

                        <option value="experience">
                            Most Experienced
                        </option>

                        <option value="fee-low">
                            Lowest Fee
                        </option>

                        <option value="fee-high">
                            Highest Fee
                        </option>

                        <option value="newest">
                            Newest Joined
                        </option>

                    </select>

                </div>

            </div>

        </div>

    );
}