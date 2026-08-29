import { readFile } from "fs/promises";
import path from "path";

const LOCAL_LAWYERS_FILE = path.join(process.cwd(), "public/data/laywer.json");
const LAWYERS_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

function normalizeLawyersPayload(payload) {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload?.value)) {
        return payload.value;
    }

    if (Array.isArray(payload?.data)) {
        return payload.data;
    }

    if (Array.isArray(payload?.lawyers)) {
        return payload.lawyers;
    }

    return [];
}

async function readLocalLawyers() {
    const contents = await readFile(LOCAL_LAWYERS_FILE, "utf8");

    return JSON.parse(contents);
}

async function fetchRemoteLawyers() {
    const url = LAWYERS_API_URL ? `${LAWYERS_API_URL}/lawyers` : null;

    if (!url) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }

    const response = await fetch(url, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to load lawyers from ${LAWYERS_API_URL}: ${response.status}`);
    }

    return normalizeLawyersPayload(await response.json());
}

export async function getLawyers() {
    try {
        return await fetchRemoteLawyers();
    } catch {
        return readLocalLawyers();
    }
}

export async function getLawyerById(id) {
    const lawyers = await getLawyers();

    return lawyers.find((lawyer) => String(lawyer._id || lawyer.id) === String(id)) || null;
}


//123456789Pp