export function buildGraphFromTracks(tracks: any[]) {
    const nodes: any[] = [];
    const links: any[] = [];

    const albumMap = new Map();

    tracks.forEach((track) => {
        // Track node
        nodes.push({
            id: track.id,
            name: track.name,
            type: "track",
        });

        const album = track.album;
        const albumId = album.id;

        // Avoid duplicate album nodes
        if (!albumMap.has(albumId)) {
            albumMap.set(albumId, true);
            nodes.push({
                id: albumId,
                name: album.name,
                type: "album",
                image: album.images?.[0]?.url || null,
            });
        }

        // Link track to album
        links.push({
            source: track.id,
            target: albumId,
        });
    });

    return { nodes, links };
}
