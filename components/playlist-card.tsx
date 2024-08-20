import React from 'react'
import Link from 'next/link';

interface playlistCardProps {
  avator_url: string;
  creator_name: string;
  playlist_id: string;
  title: string;
  videos: string[];
}
const playlistCard = ({avator_url, creator_name, playlist_id, title, videos}: playlistCardProps) => {
  return (
    <div className='w-[700px]'>
      <Link href={`view/${playlist_id}`} className='grid grid-cols-5 pt-5 hover:bg-slate-200'>
        {videos.map((item, index) => (<img key={index} src={item}/>))}
      </Link>
      <div className='flex flex-col'>
        <h1>{title}</h1>
        <div className='flex items-center'>
          <img src={avator_url} width={100}/>
          <p>{creator_name}</p>
        </div>
      </div>
    </div>
  )
}

export default playlistCard