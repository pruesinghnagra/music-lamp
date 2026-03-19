// types/Spotify.ts
export type SpotifyTrack = {
    id: string;
    name: string;
    durationMs: number;
    popularity: number | null;
    explicit: boolean;
    previewUrl: string | null;
};

export type SpotifyAlbum = {
    id: string;
    name: string;
    albumType: "album" | "single" | string;
    releaseDate: string;
    image: string | null;
    totalTracks: number;
    genres?: string[];
    externalUrl?: string;
};

export type SpotifyArtistMetrics = {
    artist: {
        name: string;
        followers: number;
        popularity: number;
        uri: string;
        genres: string[];
    };
    tracks: {
        totalTracks: number;
        averagePopularity: number;
        averageDuration: number;
        topTrackNames: string;
    };
    albums: SpotifyAlbum[];
    latestReleaseDate: string;
};

export type SpotifyAlbumMetrics = {
    album: {
        id: string;
        name: string;
        image: string | null;
        releaseDate: string;
        totalTracks: number;
        albumType: "album" | "single" | string;
        genres?: string[];
    };
    tracks: SpotifyTrack[];
    metrics: {
        numTracks: number;
        totalDuration: number;
        averageTrackDuration: number;
        averagePopularity: number;
    };
};
