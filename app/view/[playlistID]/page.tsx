'use client'
import { useState, useEffect } from 'react'
import VideoCard from '@/components/video-card';
import CustomAvatar from '@/components/avatar';

/* 
Returns:
  playlistData: { username, thumbnail },
  videos: { title, video_id, thumbnail, video_code }
*/
interface payload {
  playlistData: {
    user_preferences: { username: string, thumbnail: string},
    title: string,
    playlist_code: string
  },
  videos: { title: string, video_id: string, thumbnail: string, video_code: string }[]
}
const ViewPlaylist = ({ params }: {params: {playlistID: string}}) => {
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
  

  return (
    <>
    {!responseData ? (
      <p>
        Loading data... (First loadup of backend server tends to be a bit
        slow, 5 seconds expected)
      </p> // Add loadup screen
    ) : (
      <div className='w-full flex flex-wrap justify-center'>
        <div className='flex flex-wrap justify-evenly items-center w-full'>
          <p className='text-2xl font-bold text-center'>{responseData.playlistData.title}</p>
          
          <div className='flex flex-col items-center px-12'>
            <p>{responseData.playlistData.user_preferences.username}</p>
            <CustomAvatar avatar_url={responseData.playlistData.user_preferences.thumbnail}/>
          </div>
        </div>
        
        <div className='w-full'>
          <hr className='w-56 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700'/>
        </div>
        {responseData.videos.map((item, index) => (
          <VideoCard key={index} title={item.title} thumbnail={item.thumbnail} url={`https://www.youtube.com/watch?v=${item.video_code}&list=${responseData.playlistData.playlist_code}`}/>
        ))}
      </div>
    )}
  </>
  )
};

export default ViewPlaylist