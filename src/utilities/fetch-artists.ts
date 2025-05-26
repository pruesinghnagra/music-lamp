import { Artist } from "../types/Artist";

export async function fetchArtists(): Promise<Artist[]> {
    try {
        const reponse = await fetch("/mock-artists.json");

        if (!reponse.ok) {
            throw new Error(`Failed to fetch artist data: ${reponse.status}`);
        }

        const data = await reponse.json();

        if (!Array.isArray(data)) {
            throw new Error("Data invalid, expected an array");
        }

        return data as Artist[];
    } catch (error) {
        console.error("Error fetching artists", error);
        return [];
    }
}
