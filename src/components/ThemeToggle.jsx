"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    if (!resolvedTheme)
        return null;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="bg-white rounded-full border p-2 transition"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
//  hover:bg-slate-100 dark:hover:bg-slate-800