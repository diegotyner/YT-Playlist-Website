
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  url?: string;
}
const VideoCard = ( {title, thumbnail, url}: VideoCardProps ) => {
  return (
    <div className={`flex flex-col items-center gap-3 bg-gray-800 text-white m-2 p-6 pb-4 rounded-xl truncate ${url && 'clickable'}`} onClick={() => {console.log(url); url && window.open(url, '_blank')}}>
      <div className="w-[300px] rounded-md border-gray-500 shadow-black shadow-[0_2px_10px] border-2 overflow-hidden">
        <AspectRatio.Root ratio={16 / 9}>
          <img
            loading="lazy"
            // width="320px"
            // height="180px"
            className="h-full w-full object-cover"
            src={`${thumbnail}/hqdefault.jpg`}
            alt={`Thumbnail of ${title}`}
          />
        </AspectRatio.Root>
      </div>
      <p className="w-[280px] truncate">{title}</p>
    </div>
  )
}

export default VideoCard