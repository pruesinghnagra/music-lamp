import { useEffect, useState } from "react";
import { Artist } from "../types/Artist";
import { fetchArtists } from "../utils/fetch-artists";

export default function useArtists() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchArtists()
            .then((data) => {
                setArtists(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Unknown error");
                setLoading(false);
            });
    }, []);

    return { artists, loading, error };
}
