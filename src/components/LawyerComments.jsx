"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

function lawyerKey(lawyer) {
    return String(lawyer?._id || lawyer?.id || "");
}

export default function LawyerComments({ lawyer }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [canComment, setCanComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadComments() {
            try {
                setLoading(true);

                const params = new URLSearchParams({ lawyerId: lawyerKey(lawyer) });

                if (session?.user?.email) {
                    params.set("userEmail", session.user.email);
                }

                const response = await fetch(`/api/comments?${params.toString()}`, {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load comments.");
                }

                if (active) {
                    setComments(data.comments || []);
                    setCanComment(Boolean(data.canComment));
                }
            } catch (error) {
                toast.error(error.message || "Failed to load comments.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void loadComments();

        return () => {
            active = false;
        };
    }, [lawyer, session?.user?.email]);

    async function submitComment(event) {
        event.preventDefault();

        if (!session?.user?.email) {
            toast.error("Please log in to comment.");
            return;
        }

        if (!canComment) {
            toast.error("You can only comment after hiring this lawyer.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    userName: session.user.name,
                    lawyerId: lawyerKey(lawyer),
                    lawyerName: lawyer?.name,
                    rating,
                    comment,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Failed to post comment.");
            }

            setComment("");
            setRating(5);
            setComments((current) => [data.comment, ...current]);
            toast.success("Comment posted.");
        } catch (error) {
            toast.error(error.message || "Failed to post comment.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Only clients who have hired this lawyer can leave feedback.
                    </p>
                </div>

                {!session?.user?.email && (
                    <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                        Login required to comment
                    </div>
                )}
            </div>

            <div className="mt-6 space-y-4">
                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
                        Loading comments...
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((item) => (
                        <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{item.userName}</p>
                                <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>

                            <p className="mt-2 text-sm text-amber-600">Rating: {item.rating}/5</p>
                            <p className="mt-3 text-slate-700">{item.comment}</p>
                        </article>
                    ))
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                        No comments yet.
                    </div>
                )}
            </div>

            {session?.user?.email && canComment ? (
                <form onSubmit={submitComment} className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div>
                        <label className="text-sm font-semibold text-slate-700">Your Rating</label>
                        <select
                            value={rating}
                            onChange={(event) => setRating(Number(event.target.value))}
                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                        >
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Good</option>
                            <option value={3}>3 - Average</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            rows={4}
                            required
                            placeholder="Share your experience with this lawyer"
                            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            ) : session?.user?.email ? (
                <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                    Hire this lawyer first to unlock the comment form.
                </div>
            ) : (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                    Sign in and hire this lawyer before adding a comment.
                </div>
            )}
        </section>
    );
}