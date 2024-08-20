'use server'

import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";


/*
Returns: 
data: [] {
  playlist_id: string,
  playlist_to_videos: [] {
    videos: { thumnbail: string }
  },
  user_preferences: { username: string, thumbnail: string }
}
*/
// interface DataReturn {
//   data: {
//     playlist_id: string,
//     playlist_to_videos: {
//       videos: { thumbnail: string }
//     }[],
//     user_preferences: { username: string, thumbnail: string }
//   }[];
// }

interface PlaylistToVideos {
  videos: { thumbnail: string; };
}

interface PlaylistData {
  playlist_id: string;
  title: string;
  user_preferences: { username: string; thumbnail: string; };  
  playlist_to_videos: PlaylistToVideos[];  
}

interface GetHomePageResult {
  data?: PlaylistData[];
  error?: PostgrestError;
}

export const getHomePage = async (): Promise<GetHomePageResult> => {
  const supabase = createClient();
  const { data: creatorData, error: creatorError } = await supabase  
  .from('playlists ')
  .select(`
    playlist_id,
    title,
    user_preferences: user_id (
      username,
      thumbnail
    ),
    playlist_to_videos: playlist_id (
      videos: video_id (
        thumbnail
      )
    )
  `)
  .limit(5, { foreignTable: 'playlist_to_videos' })
  .returns<PlaylistData[]>()
  .order('added_at', { ascending: false, foreignTable: 'playlist_to_videos' });
  if (creatorError) return {error: creatorError}

  return {data: creatorData}
}