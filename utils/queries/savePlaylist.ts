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
        playlist_code: playlistPayload.metadata.code
      }, {onConflict: 'user_id, playlist_code'})
      .select()  
    const videoPromise = supabase
      .from("videos")
      .upsert(
        playlistPayload.items // doing a map if the video is not deleted
          .filter(item => item.snippet.title !== 'Deleted video') 
          .map(item => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
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
        vidData.map(items => ({playlist_id: playlistData[0].playlist_id, video_id: items.video_id}))
      , {onConflict: 'playlist_id, video_id', ignoreDuplicates: true})
    if (relationError) throw relationError;

    return { success: true };
  } catch (error) {
    console.error('Error saving playlist and videos:', error);
    return { success: false, error };
  }
}