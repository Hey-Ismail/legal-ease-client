import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const baseURL =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL;

export const authClient = createAuthClient({
    baseURL:
        typeof window !== "undefined"
            ? window.location.origin
            : (baseURL || "http://localhost:3000"),
    plugins: [adminClient()],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;

