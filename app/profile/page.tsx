'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import PlaylistCard from "@/components/playlist-card";

interface ProfilePayload {
  playlist_id: string;
  playlist_code: string;
  title: string;
  videos: string[];  
  length?: number;
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
      <Link href={'/profile/configure'} className="clickable bg-green-400 rounded-2xl text-center px-3 m-1">Configure</Link>
      This is my profile

      {!playlists ? <p>No data yet</p> : (
        <div className="flex flex-wrap gap-4 m-5 w-full">
          {playlists.map((item, index) => (<PlaylistCard key={index} length={item.length} playlist_code={item.playlist_code} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
        </div>
      )}
    </div>
  );
};

export default Profile;
