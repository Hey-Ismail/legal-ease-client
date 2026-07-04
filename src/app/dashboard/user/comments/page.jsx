"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UserCommentsPage() {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState("");
    const [draftComment, setDraftComment] = useState("");
    const [draftRating, setDraftRating] = useState(5);
    const [busyId, setBusyId] = useState("");

    useEffect(() => {
        let active = true;

        async function loadComments() {
            if (!session?.user?.email) {
                setComments([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await fetch(`/api/comments?userEmail=${encodeURIComponent(session.user.email)}`, {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load comments.");
                }

                if (active) {
                    setComments(data.comments || []);
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
    }, [session?.user?.email]);

    function onEdit(comment) {
        setEditingId(comment.id);
        setDraftComment(comment.comment);
        setDraftRating(comment.rating || 5);
    }

    async function onSave(id) {
        try {
            setBusyId(id);

            const response = await fetch("/api/comments", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    userEmail: session?.user?.email,
                    comment: draftComment,
                    rating: draftRating,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Failed to update comment.");
            }

            setComments((current) => current.map((item) => (item.id === id ? data.comment : item)));
            setEditingId("");
            setDraftComment("");
            setDraftRating(5);
            toast.success("Comment updated.");
        } catch (error) {
            toast.error(error.message || "Failed to update comment.");
        } finally {
            setBusyId("");
        }
    }

    async function onDelete(id) {
        try {
            setBusyId(id);

            const response = await fetch("/api/comments", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    userEmail: session?.user?.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Failed to delete comment.");
            }

            setComments((current) => current.filter((item) => item.id !== id));
            toast.success("Comment deleted.");
        } catch (error) {
            toast.error(error.message || "Failed to delete comment.");
        } finally {
            setBusyId("");
        }
    }

    if (!session?.user?.email) {
        return (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900">Comment Management</h1>
                <p className="mt-2 text-slate-600">
                    Sign in to view and manage your comments.
                </p>
            </section>
        );
    }

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Comment Management</h1>
            <p className="mt-2 text-slate-600">
                Edit or delete your comments on lawyer profiles.
            </p>

            <div className="mt-6 grid gap-4">
                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
                        Loading comments...
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((item) => (
                        <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{item.lawyerName}</p>
                                <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>

                            <p className="mt-1 text-sm text-slate-600">Rating: {item.rating}/5</p>

                            {editingId === item.id ? (
                                <div className="mt-3 space-y-3">
                                    <textarea
                                        value={draftComment}
                                        onChange={(event) => setDraftComment(event.target.value)}
                                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-amber-500"
                                        rows={3}
                                    />

                                    <select
                                        value={draftRating}
                                        onChange={(event) => setDraftRating(Number(event.target.value))}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
                                    >
                                        <option value={5}>5 - Excellent</option>
                                        <option value={4}>4 - Good</option>
                                        <option value={3}>3 - Average</option>
                                        <option value={2}>2 - Fair</option>
                                        <option value={1}>1 - Poor</option>
                                    </select>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onSave(item.id)}
                                            disabled={busyId === item.id}
                                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId("");
                                                setDraftComment("");
                                                setDraftRating(5);
                                            }}
                                            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-3 text-slate-700">{item.comment}</p>
                            )}

                            {editingId !== item.id && (
                                <div className="mt-4 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(item)}
                                        className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(item.id)}
                                        disabled={busyId === item.id}
                                        className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </article>
                    ))
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        No comments found.
                    </div>
                )}
            </div>
        </section>
    );
}
