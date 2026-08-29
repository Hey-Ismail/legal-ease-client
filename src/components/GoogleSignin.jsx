// src/components/GoogleSignInButton.tsx
"use client";

export default function GoogleSignInButton() {
    const handleLogin = () => {
        // Navigates the whole browser to the backend start‑point.
        window.location.href = "http://localhost:5000/auth/google";
    };

    return (
        <button
            type="button"
            onClick={handleLogin}
            className="flex items-center gap-2 rounded border px-4 py-2 hover:bg-
  gray-100"
        >
            Sign in with Google
        </button>
    );
}
