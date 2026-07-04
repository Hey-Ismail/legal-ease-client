import { NextResponse } from "next/server";
import { addHiringRecord, getHiringRecords, markHiringRecordPaid } from "@/lib/engagement-store";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail") || "";
    const lawyerId = searchParams.get("lawyerId") || "";
    const lawyerEmail = searchParams.get("lawyerEmail") || "";

    return NextResponse.json({
        records: getHiringRecords({ userEmail, lawyerId, lawyerEmail }),
    });
}

export async function POST(request) {
    try {
        const body = await request.json();

        const record = addHiringRecord({
            userEmail: body?.userEmail,
            userName: body?.userName,
            lawyerId: body?.lawyerId,
            lawyerName: body?.lawyerName,
            lawyerEmail: body?.lawyerEmail,
            lawyerSpecialization: body?.lawyerSpecialization,
            fee: body?.fee,
            status: "accepted",
        });

        if (!record) {
            return NextResponse.json(
                { message: "Missing hiring details." },
                { status: 400 }
            );
        }

        return NextResponse.json({ record }, { status: 200 });
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

        const record = markHiringRecordPaid({
            id: body?.id,
            userEmail: body?.userEmail,
        });

        if (!record) {
            return NextResponse.json(
                { message: "Unable to complete payment for this request." },
                { status: 400 }
            );
        }

        return NextResponse.json({ record }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error?.message || "Something went wrong." },
            { status: 500 }
        );
    }
}