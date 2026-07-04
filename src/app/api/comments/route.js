import { NextResponse } from "next/server";
import {
    addComment,
    deleteComment,
    getComments,
    hasHiringRecord,
    updateComment,
} from "@/lib/engagement-store";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail") || "";
    const lawyerId = searchParams.get("lawyerId") || "";

    return NextResponse.json({
        comments: getComments({ userEmail, lawyerId }),
        canComment: Boolean(userEmail && lawyerId && hasHiringRecord({ userEmail, lawyerId })),
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const userEmail = String(body?.userEmail || "").trim().toLowerCase();
        const lawyerId = String(body?.lawyerId || "").trim();

        if (!userEmail || !lawyerId) {
            return NextResponse.json(
                { message: "User and lawyer are required." },
                { status: 400 }
            );
        }

        if (!hasHiringRecord({ userEmail, lawyerId })) {
            return NextResponse.json(
                { message: "You can only comment after hiring this lawyer." },
                { status: 403 }
            );
        }

        const nextComment = addComment({
            userEmail,
            userName: body?.userName,
            lawyerId,
            lawyerName: body?.lawyerName,
            rating: body?.rating,
            comment: body?.comment,
        });

        if (!nextComment) {
            return NextResponse.json(
                { message: "Comment text is required." },
                { status: 400 }
            );
        }

        return NextResponse.json({ comment: nextComment }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error?.message || "Something went wrong." },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const updated = updateComment({
            id: body?.id,
            userEmail: body?.userEmail,
            comment: body?.comment,
            rating: body?.rating,
        });

        if (!updated) {
            return NextResponse.json(
                { message: "Comment could not be updated." },
                { status: 400 }
            );
        }

        return NextResponse.json({ comment: updated }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error?.message || "Something went wrong." },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const deleted = deleteComment({
            id: body?.id,
            userEmail: body?.userEmail,
        });

        if (!deleted) {
            return NextResponse.json(
                { message: "Comment could not be deleted." },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error?.message || "Something went wrong." },
            { status: 500 }
        );
    }
}