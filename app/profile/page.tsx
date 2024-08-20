'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import PlaylistCard from "@/components/playlist-card";

interface ProfilePayload {
  playlist_id: string;
  title: string;
  videos: string[];  
}
const Profile = () => {
  const [playlists, setPlaylists] = useState<ProfilePayload[] | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <Link href={'/profile/configure'} className="clickable bg-green-400 rounded-lg text-center">Configure</Link>
      This is my profile

      {!playlists ? <p>No data yet</p> : (
        <div className="flex flex-wrap gap-4">
          {playlists.map((item, index) => (<PlaylistCard key={index} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
        </div>
      )}
    </div>
  );
};

export default Profile;
