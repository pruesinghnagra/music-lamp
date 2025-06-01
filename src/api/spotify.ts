export async function fetchSpotifyToken() {
    try {
        const response = await fetch("http://localhost:3001/spotify-token");
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
