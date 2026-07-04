import Image from "next/image";
import Link from "next/link";

export default function LawyersCard({ lawyer }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

            <div className="relative h-72">

                <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    fill
                    className="object-cover"
                />

                {/* <span
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-md ${lawyer.availability === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}
                >
                    {lawyer.availability}
                </span> */}

            </div>

            <div className="p-6">

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {lawyer.name}
                    </h2>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${lawyer.availability === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {lawyer.availability}
                    </span>
                </div>

                <p className="text-amber-500 font-semibold mt-2">
                    {lawyer.specialization}
                </p>

                <p className="text-gray-500 mt-3 line-clamp-3">
                    {lawyer.bio}
                </p>

                <div className="mt-5 space-y-2 border-t pt-4">

                    <div className="flex justify-between">
                        <span className="font-medium">
                            Consultation Fee
                        </span>

                        <span className="font-bold text-xl text-amber-500">
                            ৳ {lawyer.consultationFee}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Date Joined</span>

                        <span className="font-medium">{lawyer.joinedDate}</span>
                    </div>
                </div>

                <Link href={`/lawyers/${lawyer._id || lawyer.id}`}>
                    <button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition">
                        View Details
                    </button>
                </Link>

            </div>
        </div>
    );
}