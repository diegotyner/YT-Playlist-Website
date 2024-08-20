'use server'

import { createClient } from "@/utils/supabase/server";




export const readUser = async (id: any) => {
  console.time('Getting user playlists');
  const supabase = createClient();
  try {
  // Extract user info from the request using the token
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw Error;

  // Extract the user ID from the session
  const userId = session.user.id;

  // Fetch playlists for the authenticated user
  console.log(userId)
  const { data, error } = await supabase
    .from('playlists ')
    .select(`
      playlist_id,
      title,
      playlist_to_videos: playlist_id (
        videos: video_id (
          thumbnail
        )
      )
    `)
    .eq('user_id', userId);

  
  } catch (error) {
    console.log(error)
    return error
  }
};