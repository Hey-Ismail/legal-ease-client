import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const FIXED_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "admin@legalease.com";
const FIXED_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "Admin@123";

function normalizeRole(role) {
    const normalized = String(role || "user").toLowerCase();

    if (normalized === "lawyer") return "lawyer";
    if (normalized === "admin") return "admin";
    return "user";
}
//123456789Oo

export async function POST(request) {
    try {
        const body = await request.json();
        const name = String(body?.name || "").trim();
        const requestedRole = normalizeRole(body?.role);

        if (!name) {
            return NextResponse.json({ message: "Name is required." }, { status: 400 });
        }
        //123456789Gg

        let email = String(body?.email || "").trim().toLowerCase();
        let password = String(body?.password || "");
        const adminCredentialsMatch = email === FIXED_ADMIN_EMAIL && password === FIXED_ADMIN_PASSWORD;

        if (requestedRole === "admin" && !adminCredentialsMatch) {
            return NextResponse.json(
                { message: "Invalid admin credentials." },
                { status: 403 }
            );
        }

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        const role = adminCredentialsMatch ? "admin" : requestedRole;

        const { data, error } = await auth.api.createUser({
            body: {
                name,
                email,
                password,
                role,
            },
        });

        if (error) {
            return NextResponse.json(
                { message: error.message || "Registration failed." },
                { status: 400 }
            );
        }

        return NextResponse.json({ user: data?.user || null }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error?.message || "Something went wrong." },
            { status: 500 }
        );
    }
}