export interface GraphNode {
    id: string;
    name: string;
    type: "artist" | "region" | "genre" | "track" | "album";
    region?: string;
    image?: string;
    imageUrl?: string;
    previewUrl?: string;
}

export interface GraphLink {
    source: string;
    target: string;
}
