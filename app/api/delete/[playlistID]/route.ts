
import { createClient } from "@/utils/supabase/server"


export const DELETE = async (req: Request, { params }: {params: {playlistID: string}}) => {
  const supabase = createClient()
  try {
    const response = await supabase
      .from('playlists')
      .delete()
      .eq('playlist_id', params.playlistID)
    if (response.status != 204) throw Error 

    return new Response("Successfully deleted", { status: 200 })

  } catch (error) {
    console.log(error)
    return new Response("Failed to delete prompt", { status: 500 })
  }
}