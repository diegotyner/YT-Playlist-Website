
import React from 'react'

interface VideoCardProps {
  title: string;
  thumbnail: string;
}
const VideoCard = ( {title, thumbnail}: VideoCardProps ) => {
  return (
    <div>
      {title}
      <img src={thumbnail} width={120}/>
    </div>
  )
}

export default VideoCard