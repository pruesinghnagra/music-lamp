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
        totalAlbums: AlbumSummary[];
    };
}

type AlbumSummary = {
    name: string;
    url: string;
};
