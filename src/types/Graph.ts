export interface GraphNode {
    id: string;
    name: string;
    type: "artist" | "region" | "genre";
    region?: string; // optional, used for artists
}

export interface GraphLink {
    source: string;
    target: string;
}
