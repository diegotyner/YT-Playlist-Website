import { createClient } from "@/utils/supabase/server";
import { payload } from "@/models/playlist";

export async function savePlaylist(userId: string, playlistPayload: payload) {
  const supabase = createClient();
  console.log("Save playlist function")
  try {
    console.log("Attempting to save playlist")
    const { data: playlistData, error: playlistError } = await supabase
      .from("playlists")
      .upsert({
        user_id: userId,
        title: playlistPayload.metadata.title,
        playlist_code: playlistPayload.metadata.code
      }, {onConflict: 'user_id, playlist_code'})
      .select()  
    if (playlistError) throw playlistError
    console.log(playlistData)

    console.log("Attempting to save videos")
    console.log(playlistPayload.items.map(item => item.snippet))
    const { data: vidData, error: vidError } = await supabase
      .from("videos")
      .upsert(
        playlistPayload.items // doing a map if the video is not deleted
          .filter(item => item.snippet.title !== 'Deleted video') 
          .map(item => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            video_code: item.snippet.resourceId.videoId,
          })), {onConflict: 'video_code'}
      )
      .select()
    if (vidError) throw vidError;

    console.log("Attempting to save relations")
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