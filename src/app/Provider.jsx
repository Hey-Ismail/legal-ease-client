"use client";

import Script from "next/script";

/**
 * Global wrapper for the whole app.
 * – Replaces a raw <script> tag with Next.js <Script> so Turbopack stops
 *   complaining (“Encountered a script tag while rendering React component”).
 * – Loads the Google Identity Services SDK (required only if you use the
 *   Google “One‑Tap” or “gsi” button).
 * – Add any other context providers you need (SessionProvider, ThemeProvider,
 *   ToastProvider, etc.) inside the fragment.
 */
export default function Providers({ children }) {
    return (
        <>
            {/* Google Identity Services SDK */}
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
            />

            {/* Other providers can be placed here */}
            {children}
        </>
    );
}