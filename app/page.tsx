"use client";

// import Image from "next/image";
// import { PlaylistItem, payload } from "@/models/playlist";
import { useState, useEffect } from "react";
import PlaylistCard from "@/components/playlist-card";
import Image from "next/image";
import PlaylistSkeleton from "@/components/playlist-skeleton";


interface Playlist {
  playlist_id: string;
  title: string;
  creator_name: string;
  avator_url: string;
  videos: string[];  // Array of video URLs as strings
  length?: number;
}

// If you want to type the array of playlists:
type PlaylistsArray = Playlist[];

export default function Home() {
  const [responseData, setResponseData] = useState<PlaylistsArray | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/home`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error: Endpoint is paused, contact admin to restart backend");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        // Check if the endpoint is down
        if (!Array.isArray(data)) {
          throw new Error("Error: Endpoint is paused, contact admin to restart backend");
        }
        setResponseData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Early return for error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <>

      {/* Find more elegant way of rendering a page of playlist skeletons */}
      {/* PlaylistSkeleton*x */}

      {!responseData ? (<div className="flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <PlaylistSkeleton key={index} />
        ))}
      </div>

      ) : (
        <>

          <div className="flex flex-wrap gap-4">
            {responseData.map((item, index) => (<PlaylistCard key={index} avatar_url={item.avator_url} creator_name={item.creator_name} length={item?.length} playlist_id={item.playlist_id} title={item.title} videos={item.videos} />))}
          </div>
          {/* <div className="grid grid-flow-row auto-rows-max gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(700px, 1fr))' }}>
            {responseData.map(item => (<PlaylistCard avator_url={item.avator_url} creator_name={item.creator_name} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
          </div> */}
        </>
      )}
    </>
  );
};
