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
    const [playlistResponse, videoResponse] = await Promise.all([
      supabase.from('playlists').select(`
        title,
        playlist_code,
        num_vids,
        user_preferences:user_id (
          username,
          thumbnail
        )
      `).eq('playlist_id', params.playlistID),
      
      supabase.from('playlist_to_videos').select(`
        videos:video_id (
          video_id,
          title,
          thumbnail,
          video_code
        )
      `)
      .eq('playlist_id', params.playlistID)
      .order('position', { ascending: true })
    ]);
    
    if (playlistResponse.error) throw playlistResponse.error;
    if (videoResponse.error) throw videoResponse.error;
    
    const playlistData = playlistResponse.data;
    const videoData = videoResponse.data;

    return new Response(JSON.stringify({playlistData: {user_preferences: playlistData[0].user_preferences, title: playlistData[0].title, playlist_code: playlistData[0].playlist_code, length: playlistData[0].num_vids}, videos: videoData.map(item => item.videos)}), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
};