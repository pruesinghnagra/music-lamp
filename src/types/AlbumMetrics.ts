type AlbumMetrics = {
    album: {
        title: string;
        artist: {
            name: string;
            url: string;
        };
        imageUrl: string;
        releaseDate: string | null;
        description: string | null;
        tags: string[];
        releases: AlbumRelease[];
    };
    metrics: {
        numTracks: number;
        totalDuration: number;
        averageTrackDuration: number;
        streamableTracks: number;
        tracksWithLyrics: number;
    };
};

type AlbumRelease = {
    name: string;
    format: string;
    description: string | null;
    url: string;
    imageUrl: string;
};
