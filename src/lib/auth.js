import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins/admin";

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;
const authDbName = process.env.AUTH_DB_NAME || "legal-ease-auth";
const appUrl = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;

if (!mongoUri) {
    throw new Error("MONGO_DB_URI is required for Better Auth.");
}

const client = new MongoClient(mongoUri);
const db = client.db(authDbName);

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;


export const auth = betterAuth({
    baseURL: appUrl,
    appName: "LegalEase",
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    // baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "user",
            },
        },
    },

    ...(googleClientId && googleClientSecret ? {
        socialProviders: {
            google: {
                clientId: googleClientId,
                clientSecret: googleClientSecret,
            },
        },
    } : {}),

    plugins: [admin()],

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});