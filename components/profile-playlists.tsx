'use client'

import { useState, useEffect } from "react";
import PlaylistCard from "@/components/playlist-card";

interface ProfilePayload {
  playlist_id: string;
  playlist_code: string;
  title: string;
  videos: string[];  
  length?: number;
}


const ProfilePlaylists = () => {
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
      <>
        {!playlists ? <></> : (
          <div className="flex flex-wrap gap-4 m-5 w-full">
            {playlists.map((item, index) => (<PlaylistCard key={index} length={item.length} playlist_code={item.playlist_code} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
          </div>
        )}
      </>
    );
};

export default ProfilePlaylists