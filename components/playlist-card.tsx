
import { useState } from 'react';
import Link from 'next/link';

interface playlistCardProps {
  avator_url?: string;
  creator_name?: string;
  playlist_id: string;
  title: string;
  videos: string[];
}
const PlaylistCard = ({avator_url, creator_name, playlist_id, title, videos}: playlistCardProps) => {
  const [deleted, setDeleted] = useState(false)
  
  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this playlist?");
    if (!hasConfirmed) return

    const response = await fetch(`/api/delete/${playlist_id}`, {
        method: "DELETE"
    })
    console.log(response)
    if (!response.ok) {
      alert('deletion failed')
      return
    }
    setDeleted(true)
  } 

  if (deleted) return null;

  return (
    <div className='w-[700px]'>
      <Link href={`view/${playlist_id}`} className='grid grid-cols-5 pt-5 hover:bg-slate-200'>
        {videos.map((item, index) => (<img key={index} src={item}/>))}
      </Link>
      {/* Home view */}
      { (avator_url && creator_name) && 
        <div className='flex flex-col'>
          <h1>{title}</h1>
          <div className='flex items-center'>
            <img src={avator_url} width={100}/>
            <p>{creator_name}</p>
          </div>
        </div> }

      {/* Profile view */}
      { !(avator_url && creator_name) && 
        <div className='flex items-center justify-between'>
          <h1>{title}</h1>
          <img src="icons/trash.svg" alt="wrench icon" className="clickable" width={30} onClick={handleDelete}></img>
        </div>}
    </div>
  )
}

export default PlaylistCard