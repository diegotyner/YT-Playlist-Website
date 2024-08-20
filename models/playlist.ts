export interface PlaylistItem {
  snippet: {
    title: string;
    description: string;
    thumbnails: { [key: string]: { url: string } };
    publishedAt: string;
    resourceId: { videoId: string };
  };
}
export interface payload {
  metadata: {
    title: string;
    length: number;
    creator: string;
    code: string;
    creator_thumbnails: { [key: string]: { url: string } };
  };
  items: PlaylistItem[];
}
