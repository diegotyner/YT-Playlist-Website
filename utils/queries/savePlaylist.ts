import { createClient } from "@/utils/supabase/server";
import { payload } from "@/models/playlist";

export async function savePlaylist(userId: string, playlistPayload: payload) {
  const supabase = createClient();
  console.log("Save playlist function")
  try {
    const playlistPromise = supabase
      .from("playlists")
      .upsert({
        user_id: userId,
        title: playlistPayload.metadata.title,
        playlist_code: playlistPayload.metadata.code,
        num_vids: playlistPayload.metadata.length,
      }, {onConflict: 'user_id, playlist_code'})
      .select()  
    const videoPromise = supabase
      .from("videos")
      .upsert(
        playlistPayload.items 
          .map(item => ({
            title: item.snippet.title,
            thumbnail: `https://i.ytimg.com/vi/${item.snippet.resourceId.videoId}`,
            video_code: item.snippet.resourceId.videoId,
          })), {onConflict: 'video_code'}
      )
      .select()
    const [{ data: playlistData, error: playlistError }, { data: vidData, error: vidError } ] = await Promise.all([playlistPromise, videoPromise]);

    if (playlistError) throw playlistError
    if (vidError) throw vidError;

    const { data: relationData, error: relationError } = await supabase
      .from("playlist_to_videos")
      .upsert(
        vidData.map((items, index) => ({playlist_id: playlistData[0].playlist_id, video_id: items.video_id, position: index}))
      , {onConflict: 'playlist_id, video_id'})
    if (relationError) throw relationError;

    return { success: true };
  } catch (error) {
    console.error('Error saving playlist and videos:', error);
    return { success: false, error };
  }
}