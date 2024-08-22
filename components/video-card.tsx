
import React from 'react'

interface VideoCardProps {
  title: string;
  thumbnail: string;
  url?: string;
}
const VideoCard = ( {title, thumbnail, url}: VideoCardProps ) => {
  return (
    <div className={`bg-gray-800 text-white m-2 p-4 rounded-xl w-[500px] truncate ${url && 'clickable'}`} onClick={() => {console.log(url); url && window.open(url, '_blank')}}>
      {title}
      <img src={thumbnail} width={120}/>
    </div>
  )
}

export default VideoCard