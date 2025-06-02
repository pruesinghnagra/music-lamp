export async function fetchSpotifyToken() {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/spotify`);

        if (!response.ok) {
            throw new Error(
                `Spotify token fetch failed: ${response.statusText}`,
            );
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchWebApi(
    endpoint: string,
    method: string,
    body?: any,
) {
    const token = await fetchSpotifyToken();
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method,
        ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
        const text = await res.text(); // Safely log error response
        throw new Error(`API error ${res.status}: ${text}`);
    }

    return res.json();
}

export async function getArtistsTopTracks(artistId: string) {
    const data = await fetchWebApi(
        `v1/artists/${artistId}/top-tracks?market=NZ`,
        "GET",
    );
    return data.tracks;
}
