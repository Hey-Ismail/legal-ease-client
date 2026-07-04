"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Filter, Search, SlidersHorizontal } from "lucide-react";
import LawyersCard from "@/components/LawyersCard";

function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
}

function parseFee(value) {
    if (value === "") return null;

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
}

const PAGE_SIZE_OPTIONS = [6, 8, 12];

export default function LawyerDirectory({ lawyers = [] }) {
    const [query, setQuery] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [availability, setAvailability] = useState("");
    const [minFee, setMinFee] = useState("");
    const [maxFee, setMaxFee] = useState("");
    const [pageSize, setPageSize] = useState(8);
    const [page, setPage] = useState(1);

    const specializationOptions = useMemo(() => {
        return Array.from(new Set(lawyers.map((lawyer) => lawyer.specialization).filter(Boolean))).sort();
    }, [lawyers]);

    function handleQueryChange(event) {
        setQuery(event.target.value);
        setPage(1);
    }

    function handleSpecializationChange(event) {
        setSpecialization(event.target.value);
        setPage(1);
    }

    function handleAvailabilityChange(event) {
        setAvailability(event.target.value);
        setPage(1);
    }

    function handleMinFeeChange(event) {
        setMinFee(event.target.value);
        setPage(1);
    }

    function handleMaxFeeChange(event) {
        setMaxFee(event.target.value);
        setPage(1);
    }

    function handlePageSizeChange(event) {
        setPageSize(Number(event.target.value));
        setPage(1);
    }

    const filteredLawyers = useMemo(() => {
        const queryText = normalizeText(query);
        const selectedMinFee = parseFee(minFee);
        const selectedMaxFee = parseFee(maxFee);

        return lawyers.filter((lawyer) => {
            const matchesQuery = !queryText || [lawyer.name, lawyer.specialization]
                .filter(Boolean)
                .some((field) => normalizeText(field).includes(queryText));

            const matchesSpecialization = !specialization || lawyer.specialization === specialization;
            const matchesAvailability = !availability || lawyer.availability === availability;
            const fee = Number(lawyer.consultationFee || 0);
            const matchesMinFee = selectedMinFee === null || fee >= selectedMinFee;
            const matchesMaxFee = selectedMaxFee === null || fee <= selectedMaxFee;

            return matchesQuery && matchesSpecialization && matchesAvailability && matchesMinFee && matchesMaxFee;
        });
    }, [lawyers, query, specialization, availability, minFee, maxFee]);

    const totalPages = Math.max(1, Math.ceil(filteredLawyers.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginatedLawyers = filteredLawyers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function clearFilters() {
        setQuery("");
        setSpecialization("");
        setAvailability("");
        setMinFee("");
        setMaxFee("");
        setPage(1);
    }

    return (
        <div className="mt-12 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                        <Filter size={16} />
                        Search & Filters
                    </div>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                        Clear Filters
                    </button>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="search"
                            value={query}
                            onChange={handleQueryChange}
                            placeholder="Search by name or specialization"
                            className="w-full bg-transparent outline-none"
                        />
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <SlidersHorizontal size={18} className="text-amber-500" />
                        <select
                            value={specialization}
                            onChange={handleSpecializationChange}
                            className="w-full bg-transparent outline-none"
                        >
                            <option value="">All Specializations</option>
                            {specializationOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <SlidersHorizontal size={18} className="text-amber-500" />
                        <select
                            value={availability}
                            onChange={handleAvailabilityChange}
                            className="w-full bg-transparent outline-none"
                        >
                            <option value="">All Availability</option>
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                        </select>
                    </label>

                    <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Min Fee
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={minFee}
                            onChange={handleMinFeeChange}
                            placeholder="0"
                            className="mt-1 w-full bg-transparent outline-none"
                        />
                    </label>

                    <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Max Fee
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={maxFee}
                            onChange={handleMaxFeeChange}
                            placeholder="Any"
                            className="mt-1 w-full bg-transparent outline-none"
                        />
                    </label>

                    <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Lawyers Per Page
                        </span>
                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="mt-1 w-full bg-transparent outline-none"
                        >
                            {PAGE_SIZE_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold text-amber-600">{paginatedLawyers.length}</span> of <span className="font-semibold text-slate-900">{filteredLawyers.length}</span> lawyers
                </p>

                <p className="text-sm text-slate-500">
                    Page <span className="font-semibold text-slate-900">{currentPage}</span> of <span className="font-semibold text-slate-900">{totalPages}</span>
                </p>
            </div>

            {paginatedLawyers.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {paginatedLawyers.map((lawyer) => (
                        <LawyersCard
                            key={lawyer._id || lawyer.id}
                            lawyer={lawyer}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                    No lawyers match the current filters.
                </div>
            )}

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ArrowLeft size={16} />
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => setPage(pageNumber)}
                            className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${pageNumber === currentPage
                                ? "bg-slate-900 text-white"
                                : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                                }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}