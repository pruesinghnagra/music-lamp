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
