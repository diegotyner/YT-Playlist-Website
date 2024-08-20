'use server'

import { createClient } from "@/utils/supabase/server";



interface PlaylistData {
  playlist_id: string;
  title: string;
  playlist_to_videos: { videos: {thumbnail: string;} }[];  
}
export const GET = async (req: Request, { params }: {params: {userID: string}}) => {
  const supabase = createClient();
  try {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw Error;

  const userId = session.user.id;
  const { data, error } = await supabase
    .from('playlists')
    .select(`
      playlist_id,
      title,
      playlist_to_videos: playlist_id (
        videos: video_id (
          thumbnail
        )
      )
    `)
    .limit(5, { foreignTable: 'playlist_to_videos' })
    .eq('user_id', userId)
    .returns<PlaylistData[]>()
    .order('created_at', { ascending: false, foreignTable: 'playlist_to_videos' });

  const payload = data?.map(item => ({playlist_id: item.playlist_id, title: item.title, videos: item.playlist_to_videos.map(item => item.videos.thumbnail)}))
  return new Response(JSON.stringify(payload), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
};
