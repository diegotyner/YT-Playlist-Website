import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomAvatar from "./avatar";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import "@/components/playlist-card.css";


interface playlistCardProps {
  avatar_url?: string;
  creator_name?: string;
  playlist_id: string;
  title: string;
  videos: string[];
  length?: number;
}
const PlaylistCard = ({
  avatar_url,
  creator_name,
  playlist_id,
  title,
  videos,
  length,
}: playlistCardProps) => {
  const [deleted, setDeleted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const thumbnails = videos.map(item => `${item}/hqdefault.jpg`) // EDIT TO GET CORRECT QUALITY

  const handleDelete = async () => {
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
      <div className="w-full sm:aspect-auto sm:w-[400px] border-2 border-neutral-400 p-3 rounded-2xl">
        <div className="aspect-video">
          <Link
            href={`view/${playlist_id}`}
            className="w-full h-full inset-attempt bg-gray-800 clickable py-6 rounded-2xl"
          >
            {thumbnails.map((item, index) => (
              <>
                {length && (<p className="text-gray-400 right-5 top-4">
                  {length}
                </p>)}
                <div className={`rounded-md shadow-[0_2px_10px] border-2 border-gray-500 showing-${index} overflow-hidden` }>
                  <AspectRatio.Root ratio={16 / 9} >
                    <img
                      loading="lazy" 
                      // width={320}
                      // height={180}
                      className="h-full w-full object-cover"
                      key={index}
                      src={item}
                      alt={`Video thumbnail ${index}`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  </AspectRatio.Root>
                </div>
                <div className={`rounded-md shadow-[0_2px_10px] border-2 border-gray-500 backup overflow-hidden hidden-${index} ${
                      index === hoveredIndex ? `hovered hovered-${index}` : ""
                    }`}>
                  <AspectRatio.Root ratio={16 /9} >
                    <img
                      loading="lazy" 
                      width={320}
                      height={180}
                      className="h-full w-full object-cover"
                      alt={`Video thumbnail ${index}`}
                      key={`${index}_hidden`}
                      src={item}
                    />
                  </AspectRatio.Root>
                </div>
              </>
            ))}
          </Link>
        </div>

        {/* Home view */}
        {(avatar_url || creator_name) && (
          <div className="flex w-full mx-2 mt-2">
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
            <DeleteDialog action={handleDelete} />
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

const DeleteDialog = ({ action = () => {} }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <img
        src="icons/trash.svg"
        alt="wrench icon"
        className="clickable"
        width={30}
      />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-50 bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="z-50 m-0 text-[17px] font-medium">
          Do you want to delete the playlist?
        </AlertDialog.Title>
        <AlertDialog.Description className="z-50 text-gray-500 mt-4 mb-5 text-[15px] leading-normal">
          This will delete all the data of the playlist
        </AlertDialog.Description>
        <div className="z-50 flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="z-50 text-gray-600 bg-gray-200 hover:bg-gray-300 focus:shadow-gray-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-sm">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              className="z-50 text-red-600 bg-red-200 hover:bg-red-300 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-sm"
              onClick={action}
            >
              Yes, delete playlist
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default PlaylistCard;
