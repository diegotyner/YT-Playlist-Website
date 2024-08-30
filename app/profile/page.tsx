'use server'

import Link from "next/link";
import ProfilePlaylists from "@/components/profile-playlists";

interface ProfilePayload {
  playlist_id: string;
  playlist_code: string;
  title: string;
  videos: string[];  
  length?: number;
}

const Profile = () => {

  return (
    <div className="w-full h-full flex flex-col items-center text">
      {/* <div className="w-[75px] h-[75px] relative flex-shrink-0">
        <MyAvatar />
        <img src="assets/horns.png" className="absolute inset-0"/>
      </div> */}

      <div className="w-full flex justify-end gap-4">
        <Link href={'/profile/configure'} className="clickable bg-green-400 rounded-2xl text-center px-3 m-1">
          Edit Preferences 
        </Link>
        <form action="/auth/signout" method="post">
          <button className="clickable bg-red-400 rounded-2xl text-center px-3 m-1" type="submit">
            Sign out
          </button>
        </form>
      </div>


      
      <h1 className="text-xl my-10">My Playlists</h1>


      
      <ProfilePlaylists />
    </div>
  );
};

export default Profile;
