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

      <PlaylistURLForm id={data.user.id}/>
    </>
  )
}

export default Create