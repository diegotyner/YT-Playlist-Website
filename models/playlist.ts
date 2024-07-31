export interface PlaylistItem {
  snippet: {
    title: string;
    description: string;
    thumbnails: { [key: string]: { url: string } };
    publishedAt: string;
    resourceId: { videoId: string };
  };
}
