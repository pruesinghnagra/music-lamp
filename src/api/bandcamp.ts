export async function fetchBandcampBand(name: string) {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(
            `${backendUrl}/api/bandcamp/metrics?name=${
                encodeURIComponent(name)
            }`,
        );

        if (!response.ok) {
            const text = await response.text();
            throw new Error(
                `Bandcamp fetch failed ${response.status}: ${text}!`,
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
