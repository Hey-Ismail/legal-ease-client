// import Image from "next/image";
// import Link from "next/link";

// export default function LawyersCard({ lawyer }) {
//   return (
//     <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

//       {/* Image */}

//       <div className="relative h-80 overflow-hidden">
//         <Image
//           src={lawyer.image}
//           alt={lawyer.name}
//           fill
//           className="object-cover transition duration-500 group-hover:scale-105"
//         />

//         <div className="absolute top-5 left-5">
//           <span
//             className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md ${lawyer.availability === "Available"
//               ? "bg-green-100/90 text-green-700"
//               : "bg-red-100/90 text-red-600"
//               }`}
//           >
//             {lawyer.availability}
//           </span>
//         </div>
//       </div>

//       {/* Content */}

//       <div className="p-8">

//         <h2 className="text-3xl font-bold text-slate-900">
//           {lawyer.name}
//         </h2>

//         <p className="mt-2 text-lg font-semibold text-amber-500">
//           {lawyer.specialization}
//         </p>

//         <p className="mt-2 text-slate-600 leading-8 line-clamp-3">
//           {lawyer.bio}
//         </p>

//         <div className="my-3 border-t border-slate-200"></div>

//         <div className="space-y-4">

//           <div className="flex justify-between items-center">
//             <span className="text-slate-500">
//               Consultation Fee
//             </span>

//             <span className="text-2xl font-bold text-slate-900">
//               ৳ {lawyer.consultationFee}
//             </span>
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-slate-500">
//               Joined
//             </span>

//             <span className="font-medium text-slate-800">
//               {lawyer.joinedDate}
//             </span>
//           </div>

//         </div>

//         <Link href={`/lawyers/${lawyer._id}`}>
//           <button className="mt-8 w-full rounded-2xl bg-slate-900 py-4 text-white font-semibold transition hover:bg-amber-500 hover:text-slate-900">
//             Hire Lawyer
//           </button>
//         </Link>

//       </div>

//     </div>
//   );
// }