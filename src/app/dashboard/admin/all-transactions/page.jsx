export default function AllTransactionsPage() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-3xl font-bold text-slate-900">All Transactions</h1>
            <p className="mt-2 text-slate-600">
                Admin transaction table placeholder for payment history and audit data.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-left text-slate-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Transaction ID</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Amount</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        <tr>
                            <td className="px-4 py-4">No data yet</td>
                            <td className="px-4 py-4">-</td>
                            <td className="px-4 py-4">-</td>
                            <td className="px-4 py-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}