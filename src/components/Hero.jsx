"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center "
        // style={{
        //     backgroundImage:
        //         "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1920&auto=format&fit=crop')",
        // }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0F172B]"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl px-6 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .7 }}
                    className="text-4xl md:text-6xl font-extrabold leading-tight"
                >
                    Find & Hire <br />
                    Expert Legal Counsel
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .3 }}
                    className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
                >
                    Connect with verified lawyers specializing in Criminal,
                    Corporate, Family, Immigration, Civil and Business Law.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .5 }}
                    className="mt-10"
                >
                    <Link
                        href="/browse-lawyers"
                        className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 duration-300"
                    >
                        Browse Lawyers
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}