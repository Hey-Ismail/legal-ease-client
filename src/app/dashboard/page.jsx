"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

function normalizeRole(role) {
  if (!role) return "user";

  const normalized = String(role).toLowerCase();

  if (normalized === "lawyer") return "lawyer";
  if (normalized === "admin") return "admin";

  return "user";
}

export default function DashboardPage() {
  const { data: session } = useSession();

  const role = normalizeRole(session?.user?.role);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard Profile</h1>
      <p className="mt-2 text-slate-600">
        Your account details and quick actions are shown below.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Full Name</p>
          <p className="mt-1 font-semibold text-slate-900">
            {session?.user?.name || "Not set yet"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
          <p className="mt-1 font-semibold text-slate-900 break-all">
            {session?.user?.email || "No email"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
          <p className="mt-1 font-semibold text-slate-900 capitalize">{role}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Profile Picture</p>
          <p className="mt-1 font-semibold text-slate-900">
            {session?.user?.image ? "Uploaded" : "Not uploaded"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {role === "lawyer" ? (
          <>
            <Link
              href="/dashboard/lawyer/manage-legal-profile"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Manage Legal Profile
            </Link>

            <Link
              href="/dashboard/lawyer/hiring-history"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              View Hiring Requests
            </Link>
          </>
        ) : role === "admin" ? (
          <>
            {/* <Link
              href="/dashboard/admin/analytics"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Open Analytics
            </Link> */}

            {/* <Link
              href="/dashboard/admin/manage-users"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Manage Users
            </Link> */}
          </>
        ) : (
          <>
            <Link
              href="/dashboard/user/update-profile"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Update Profile
            </Link>

            <Link
              href="/dashboard/user/hiring-history"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              View Hiring History
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
