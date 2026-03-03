interface MetricSummary {
    artist: {
        name: string;
        locationPresent: number;
        descriptionPresent: number;
        imagePresent: number;
        labelPresent: number;
        keywordsPresent: number;
        publisherPresent: number;
        featuredTrackPresent: number;
    };
    discography: {
        totalAlbums: number;
        albumsWithReleaseDate: number;
        albumsWithTrackCount: number;
        albumsWithImage: number;
        albumsWithDescription: number;
        albumsWithLabel: number;
        averageTracksPerAlbum: number;
        totalTrackCount: number;
        totalStreamableTracks: number;
        totalTracksWithLyrics: number;
    };
}
