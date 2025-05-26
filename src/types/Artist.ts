export interface Platforms {
    spotify: {
        followers: number;
        monthlyListeners: number;
        playlistCount: number;
    };
    youtube: {
        subscribers: number;
        averageViews: number;
    };
    bandcamp: {
        followers: number;
        totalReleases: number;
    };
}

export interface Artist {
    artistName: string;
    genre: string[];
    region: string;
    foodType: string[];
    language: string[];
    platforms: Platforms;
    activeSince: number;
    selfDescribedIndie: boolean;
}
