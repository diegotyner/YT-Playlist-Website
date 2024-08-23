import { useState, useEffect } from "react";
import Link from "next/link";
import CustomAvatar from "./avatar";
import "@/components/playlist-card.css";

interface playlistCardProps {
  avatar_url?: string;
  creator_name?: string;
  playlist_id: string;
  title: string;
  videos: string[];
}
const PlaylistCard = ({
  avatar_url,
  creator_name,
  playlist_id,
  title,
  videos,
}: playlistCardProps) => {
  const [deleted, setDeleted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (!hasConfirmed) return;

    const response = await fetch(`/api/delete/${playlist_id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      alert("deletion failed");
      return;
    }
    setDeleted(true);
  };

  if (deleted) return null;

  return (
    <>
      <div className="w-[400px] border-2 border-neutral-400 p-3 rounded-2xl">
        <div className="h-[200px]">
          <Link
            href={`view/${playlist_id}`}
            className="w-full h-full inset-attempt bg-gray-800 clickable py-6 rounded-2xl"
          >
            {videos.map((item, index) => (
              <>
                <img
                  className={`border-2 border-gray-400 showing-${index}`}
                  key={index}
                  src={item}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <img
                  className={`border-2 border-gray-400 backup hidden-${index} ${
                    index === hoveredIndex ? `hovered hovered-${index}` : ""
                  }`}
                  key={`${index}_hidden`}
                  src={item}
                />
              </>
            ))}
          </Link>
        </div>

        {/* Home view */}
        {(avatar_url || creator_name) && (
          <div className="flex w-auto mx-2 mt-2">
            <CustomAvatar avatar_url={avatar_url} />
            <div className="flex-grow flex flex-col w-1 pl-3 my-2">
              <h1 className="w-full truncate">{title}</h1>
              <p className="text-gray-600">{creator_name}</p>
            </div>
          </div>
        )}

        {/* Profile view */}
        {!(avatar_url || creator_name) && (
          <div className="flex items-center justify-between w-auto mx-3 mt-3">
            <h1 className="truncate w-5/6">{title}</h1>
            <img
              src="icons/trash.svg"
              alt="wrench icon"
              className="clickable"
              width={30}
              onClick={handleDelete}
            />
          </div>
        )}


      </div>
    </>
  );
};

/* <Link href={`view/${playlist_id}`} className='grid grid-cols-5 pt-5 hover:bg-slate-200'>
  {videos.map((item, index) => (<img className="border-2 border-black" key={index} src={item} width={120}/>))}
</Link> */
/* <div className=''>    
  <Link href={`view/${playlist_id}`} className='w-full unselected-grid bg-gray-800 clickable py-6 rounded-2xl'>
    {videos.map((item, index) => (<img className="border-2 border-gray-400" key={index} src={item} />))}
  </Link>
</div> */

export default PlaylistCard;
