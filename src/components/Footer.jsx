import Link from "next/link";
import { Scale, Send } from "lucide-react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* Logo & Description */}

                    {/* Logo & Description */}

                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <Scale className="text-amber-600" size={28} />
                            <h2 className="text-2xl font-bold text-gray-900">
                                LegalEase
                            </h2>
                        </Link>

                        <p className="mt-4 text-gray-600 leading-7 max-w-sm">
                            Find trusted lawyers for business, family,
                            criminal and corporate legal services.
                        </p>

                        {/* Social Icons */}

                        <div className="flex gap-5 text-gray-600 mt-5">

                            <Link href="#">
                                <FaFacebookF className="hover:text-amber-600 transition" />
                            </Link>

                            <Link href="#">
                                <FaTwitter className="hover:text-amber-600 transition" />
                            </Link>

                            <Link href="#">
                                <FaLinkedinIn className="hover:text-amber-600 transition" />
                            </Link>

                            <Link href="#">
                                <FaInstagram className="hover:text-amber-600 transition" />
                            </Link>

                        </div>
                    </div>

                    {/* Quick Links */}

                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-600">

                            <li>
                                <Link href="/about" className="hover:text-amber-600 transition">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="hover:text-amber-600 transition">
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-amber-600 transition"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Newsletter */}

                    <div>

                        <h3 className="font-semibold text-lg text-gray-900 mb-4">
                            Newsletter
                        </h3>

                        <p className="text-gray-600 mb-5">
                            Subscribe to receive legal tips and platform updates.
                        </p>

                        <div className="flex">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 border rounded-l-lg px-4 py-3 outline-none focus:border-amber-500"
                            />

                            <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 rounded-r-lg transition">

                                <Send size={18} />

                            </button>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="border-t mt-10 pt-6 text-center">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} LegalEase. All rights reserved.
                    </p>

                </div>

            </div>
        </footer>
    );
}