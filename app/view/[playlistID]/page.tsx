'use client'
import { useState, useEffect } from 'react'
import VideoCard from '@/components/video-card';

/* 
Returns:
  playlistData: { username, thumbnail },
  videos: { title, video_id, thumbnail, video_code }
*/
interface payload {
  playlistData: { username: string, thumbnail: string},
  videos: { title: string, video_id: string, thumbnail: string, video_code: string }[]
}
const viewPlaylist = ({ params }: {params: {playlistID: string}}) => {
  const [responseData, setResponseData] = useState<payload | null>(null);
  const examplePlaylist = "64ed6898-1e7a-4411-8fc6-d1bf544e5bc3";
  useEffect(() => {
    fetch(`/api/view/${params.playlistID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponseData(data);
      });
    console.log(responseData)
  }, []);
  console.log(params.playlistID)
  

  return (
    <>
    {!responseData ? (
      <p>
        Loading data... (First loadup of backend server tends to be a bit
        slow, 5 seconds expected)
      </p> // Add loadup screen
    ) : (
      <div className='w-full'>
        <VideoCard title={responseData.playlistData.username} thumbnail={responseData.playlistData.thumbnail}/>
        {responseData.videos.map((item, index) => (
          <VideoCard key={index} title={item.title} thumbnail={item.thumbnail}/>
        ))}
      </div>
    )}
  </>
  )
};

export default viewPlaylist