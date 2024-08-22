'use server'

import PlaylistURLForm from "@/components/submit-playlist-form";

import { createClient } from "@/utils/supabase/server";

const Create = async() => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error)
    return <p>Error getting user session</p>;
  }


  return (
    <>
      <h1>
        Enter the link to either a youtube playlist, or a video in a youtube playlist
      </h1>
      <h2 className="text-left border border-indigo-400 bg-indigo-200 rounded-xl m-2 p-2">
        Note, it cannot be:
         <p>- A shortened &quot;share url&quot; of a video as this will remove the playlist ID</p>
         <p className="w-full text-left">- A youtube mix, as those aren&apos;t playlists for some reason</p>
      </h2>


      <PlaylistURLForm id={data.user.id}/>
    </>
  )
}

export default Create