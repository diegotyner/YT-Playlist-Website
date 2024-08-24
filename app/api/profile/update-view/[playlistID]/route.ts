'use server'

import { getHomePage } from "@/utils/queries/getHomePage";
import { createClient } from "@/utils/supabase/server";

/* 
Returns:
interface DataReturn {
  data: {
    playlist_id: string,
    playlist_to_videos: {
      videos: { thumbnail: string }
    }[],
    user_preferences: { username: string, thumbnail: string }
  }[];
}
*/


interface PlaylistToVideos {
  videos: { thumbnail: string; };
}

interface PlaylistData {
  playlist_id: string;
  title: string;
  user_preferences: { username: string; thumbnail: string; };  
  playlist_to_videos: PlaylistToVideos[];  
  num_vids?: number;
}
export const GET = async (req: Request, { params }: {params: {playlistID: string}}) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase  
    .from('playlists')
    .select(`
      title,
      num_vids,
      playlist_to_videos: playlist_id (
        videos: video_id (
          thumbnail
        )
      )
    `)
    .eq('playlist_id', params.playlistID)
    .limit(5, { foreignTable: 'playlist_to_videos' })
    .returns<PlaylistData[]>()
    .order('position', { ascending: true, foreignTable: 'playlist_to_videos' });
    if (error) throw error
  
    const payload = data?.map(item => {
      return {
        videos: item.playlist_to_videos.map(item => item.videos.thumbnail),
        title: item.title,
        length: item.num_vids,
      }
    })


    return new Response(JSON.stringify(payload), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
};