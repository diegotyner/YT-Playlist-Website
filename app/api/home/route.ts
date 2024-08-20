'use server'

import { getHomePage } from "@/utils/queries/getHomePage";

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

export const GET = async (req: Request) => {
  try {
    const { data, error } = await getHomePage();
    if (error) return new Response(JSON.stringify(error), { status: 500,   headers: { 'Cache-Control': 'no-store' }, })
    const payload = data?.map(item => {
      return {
        playlist_id: item.playlist_id,
        videos: item.playlist_to_videos.map(item => item.videos.thumbnail),
        title: item.title,
        creator_name: item.user_preferences.username,
        avator_url: item.user_preferences.thumbnail
      }
    })


    return new Response(JSON.stringify(payload), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
};