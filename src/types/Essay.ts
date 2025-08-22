export type EssayStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface EssayListItem {
    id: string;
    title: string;
    slug: string;
    coverImage: string | null;
    status: EssayStatus;
    updatedAt: string; // ISO string
    tags: string[];
}

export interface MediaItem {
    id: string;
    url: string;
    alt?: string | null;
    credit?: string | null;
    width?: number | null;
    height?: number | null;
    order: number;
    provider?: string | null;
    sourceId?: string | null;
}

export interface EssayDetail extends EssayListItem {
    content: string;
    imageCredit?: string | null;
    albumRefProvider?: string | null;
    albumRefId?: string | null;
    publishedAt?: string | null;
    createdAt: string; // ISO string
    images: MediaItem[];
}
