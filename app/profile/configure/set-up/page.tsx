'use server'

const SetUp = async () => {
  console.log("User setting up")
  return (
    <div className="border-gray-600 border-b-2">
      It looks like you haven't set your user display preferences yet! Before you can submit playlists, please select a display name and profile picture
    </div>
  );
};

export default SetUp;

/* 
'use server'

import PreferenceForm from "@/components/preference-form";

import { createClient } from "@/utils/supabase/server";
import { readUser } from "@/utils/queries/readUser";

const SetUp = async () => {
  console.time('Set Up');
  const supabase = createClient();
  console.time("Set up getting user")
  const { data, error } = await supabase.auth.getUser()
  console.timeEnd("Set up getting user")
  if (error) {
    console.error('Error getting user:', error);
    return <p>Error getting user session</p>
  }

  const user = data.user
  // console.log(data.user)
  return (
    <>
      <div className="border-gray-600 border-b-2">It looks like you haven't set your user display preferences yet! Before you can submit playlists, please select a display name and profile picture</div>
      <PreferenceForm id={user.id} username={user.user_metadata?.custom_metadata.display_name || user.user_metadata.name} thumbnail={user.user_metadata?.custom_metadata.avatar_url} /> {/* id, username, thumbnail /}
      {  console.timeEnd('Set Up') }
    </>
  );
};

export default SetUp;
*/