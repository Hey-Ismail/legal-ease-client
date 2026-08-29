import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins/admin";

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;
const authDbName = process.env.AUTH_DB_NAME || "legal_ease_db";
const isDev = process.env.NODE_ENV === "development";
const appUrl = isDev
    ? (process.env.BETTER_AUTH_DEV_URL || "http://localhost:3000")
    : (process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "https://legal-ease-client-amber.vercel.app");



if (!mongoUri) {
    console.error("⚠️  MONGO_DB_URI is not set. Auth will not work.");
}

const client = mongoUri ? new MongoClient(mongoUri) : null;
const db = client ? client.db(authDbName) : null;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
    baseURL: appUrl,
    appName: "LegalEase",
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    socialProviders: {
        ...(googleClientId && googleClientSecret ? {
            google: {
                clientId: googleClientId,
                clientSecret: googleClientSecret,
            },
        } : {}),
    },

    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://legal-ease-client-amber.vercel.app",
    ],

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "user",
            },
        },
    },

    plugins: [admin()],

    database: mongodbAdapter(db, {
        client,
    }),
});