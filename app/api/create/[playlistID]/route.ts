import { PlaylistItem } from "@/models/playlist";
import { savePlaylist } from "@/utils/queries/savePlaylist";

const API_URL = process.env.YT_DATA_API_URL;
const API_KEY = process.env.YT_DATA_API_KEY;



export const POST = async (req: Request, { params }: {params: {playlistID: string, userID: string}}) => {
  try {
    if (!params.playlistID) {
      return new Response("No playlistID provided", { status: 400 })
    }

    let allItems: PlaylistItem[] = []
    let nextPageToken: string | undefined = '';
    do {
      const data = await fetchPlaylistItems(params.playlistID, nextPageToken)
      allItems = allItems.concat(data.items)
      nextPageToken = data?.nextPageToken
      console.log("One loop")
    } while (nextPageToken);
    
    // title, length, creator, thumbnail
    const metadata = await fetchPlaylistMetadata(params.playlistID, allItems.length);
    const responsePayload = {
      metadata,
      items: allItems
    };

    const saveResponse = await savePlaylist(params.userID, responsePayload);
    return new Response(JSON.stringify(saveResponse), { status: 200 });
  } catch( error ) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add playlist" }), { status: 500 }); 
  }
};


/*
Returns: {
  metadata: {
    creator,
    length,
    thumbnails: { [key: string]: { url: string } },
    title
  },
  payload: { 
    type Snippet = { publishedAt: string; channelId: string; title: string; description: string; thumbnails: { [key: string]: { url: string } }; channelTitle: string; playlistId: string; position: number; resourceId: { kind: string; videoId: string }; videoOwnerChannelTitle: string; videoOwnerChannelId: string; };
  }
}
*/
export const GET = async (req: Request, { params }: {params: {playlistID: string}}) => {
  try {
    // await connectToDB();

    if (!params.playlistID) {
      return new Response("No playlistID provided", { status: 400 })
    }

    let allItems: PlaylistItem[] = []
    let nextPageToken: string | undefined = '';
    do {
      const data = await fetchPlaylistItems(params.playlistID, nextPageToken)
      allItems = allItems.concat(data.items)
      nextPageToken = data?.nextPageToken
      console.log("One loop")
    } while (nextPageToken);
     
    // title, length, creator, thumbnail
    const metadata = await fetchPlaylistMetadata(params.playlistID, allItems.length);
    const responsePayload = {
      metadata,
      items: allItems
    };
    return new Response(JSON.stringify(responsePayload), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch all prompts" }), { status: 500 });
  }
};

const fetchPlaylistItems = async (playlistId: string, pageToken = '') => {
  const url = new URL(`${API_URL}playlistItems`);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('playlistId', playlistId);
  url.searchParams.append('maxResults', '50');
  url.searchParams.append('key', API_KEY!);
  if (pageToken) url.searchParams.append('pageToken', pageToken);

  const response = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Error in response from YT (is the ID correct?)");
  }
  const data = await response.json()
  return data
};
const fetchPlaylistMetadata = async (playlistId: string, length: number) => {
  const url = new URL(`${API_URL}playlists`);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('id', playlistId);
  url.searchParams.append('key', API_KEY!);

  const response = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Error in response from YT (Metadata)");
  }
  const data = await response.json()
  const playlistSnippet = data.items[0].snippet;
  const channelThumbnail = await fetchChannelThumbnail(playlistSnippet.channelId);
  
  return {
    title: playlistSnippet.title,
    length,
    creator: playlistSnippet.channelTitle,
    creator_thumbnails: channelThumbnail,
    code: playlistId,
  };
};
const fetchChannelThumbnail = async (channelId: string) => {
  const url = new URL(`${API_URL}channels`);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('id', channelId);
  url.searchParams.append('fields', "items/snippet/thumbnails");
  url.searchParams.append('key', API_KEY!);
  const response = await fetch(url.toString(), {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error("Error in response from YT (Channel Thumbnail)");
  }
  const data = await response.json()
  return data.items[0].snippet.thumbnails
};