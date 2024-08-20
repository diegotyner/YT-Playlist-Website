'use server'

import { createClient } from "@/utils/supabase/server";

/* 
Returns:
  playlistData: { usenrame, thumbnail },
  videos: { title, video_id, thumbnail, video_code }
*/

export const GET = async (req: Request, { params }: {params: {playlistID: string}}) => {
  const supabase = createClient();
  try {
    console.log("Here")
    const { data: playlistData, error: playlistError } = await supabase
      .from('playlists')
      .select(`
        user_preferences:user_id (
          username,
          thumbnail
        )
      `)
      .eq('playlist_id', params.playlistID);
    if (playlistError) throw playlistError;

    const { data: videoData, error: videosError } = await supabase
      .from('playlist_to_videos')
      .select(`
        videos:video_id (
          video_id,
          title,
          thumbnail,
          video_code
        )
      `)
      .eq('playlist_id', params.playlistID);
    if (videosError) throw videosError;


    return new Response(JSON.stringify({playlistData: playlistData[0].user_preferences, videos: videoData.map(item => item.videos)}), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
};