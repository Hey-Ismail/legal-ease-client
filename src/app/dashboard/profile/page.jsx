export default function DashboardProfilePage() {
  return (
    <section className="max-w-5xl mx-auto px-5 py-20">
      <h1 className="text-4xl font-bold text-slate-900">Profile</h1>
      <p className="mt-4 text-slate-600">
        This legacy route is deprecated. Use /dashboard for profile overview
        and /dashboard/user/update-profile to edit profile details.
      </p>
    </section>
  );
}
