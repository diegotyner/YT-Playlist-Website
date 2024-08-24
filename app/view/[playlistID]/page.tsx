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
    playlist_code: string,
    length?: number,
  },
  videos: { title: string, video_id: string, thumbnail: string, video_code: string }[]
}
const ViewPlaylist = ({ params }: {params: {playlistID: string}}) => {
  const [responseData, setResponseData] = useState<payload | null>(null);
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
        Loading data...
      </p> // Add loadup screen
    ) : (
      <div className='w-full flex flex-wrap justify-center'>
        <div className='flex flex-wrap justify-evenly items-center w-full'>
          <div>
            <h2 className='text-2xl font-bold text-center'>{responseData.playlistData.title}</h2>
            <p className='text-gray-500/90 text-lg pt-1 w-full text-center font-bold'>{responseData.playlistData.length && (`Length - ${responseData.playlistData.length}`)}</p>
          </div>
          
          <div className='flex flex-col items-center px-12 gap-2'>
            <p className=''>{responseData.playlistData.user_preferences.username}</p>
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