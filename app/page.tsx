"use client";

// import Image from "next/image";
// import { PlaylistItem, payload } from "@/models/playlist";
import { useState, useEffect } from "react";
import PlaylistCard from "@/components/playlist-card";
import Image from "next/image";
import PlaylistSkeleton from "@/components/playlist-skeleton";


interface Playlist {
  playlist_id: string;
  title: string;
  creator_name: string;
  avator_url: string;
  videos: string[];  // Array of video URLs as strings
  length?: number;
}

// If you want to type the array of playlists:
type PlaylistsArray = Playlist[];

export default function Home() {
  const [responseData, setResponseData] = useState<PlaylistsArray | null>(null);
  useEffect(() => {
    fetch(`/api/home`)
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
      
      {/* Find more elegant way of rendering a page of playlist skeletons */}
      {/* PlaylistSkeleton*x */}

      {!responseData ? (<div className="flex flex-wrap gap-4"> 
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
        <PlaylistSkeleton></PlaylistSkeleton>
      </div>

      ) : (
        <>
          
          <div className="flex flex-wrap gap-4">
            {responseData.map((item, index) => (<PlaylistCard key={index} avatar_url={item.avator_url} creator_name={item.creator_name} length={item?.length} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
          </div>
          {/* <div className="grid grid-flow-row auto-rows-max gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(700px, 1fr))' }}>
            {responseData.map(item => (<PlaylistCard avator_url={item.avator_url} creator_name={item.creator_name} playlist_id={item.playlist_id} title={item.title} videos={item.videos}/>))}
          </div> */}
        </>
      )}
    </>
  );
}


// export default function Home() {
//   const [responseData, setResponseData] = useState<payload | null>(null);
//   const examplePlaylist = "PLw5btzHeU_u9l7tYGZuHab0fV3RFW27No";
//   useEffect(() => {
//     fetch(`/api/create/${examplePlaylist}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setResponseData(data);
//       });
//   }, []);

//   return (
//     <>
//       {!responseData ? (
//         <p>
//           Loading data... (First loadup of backend server tends to be a bit
//           slow, 5 seconds expected)
//         </p> // Add loadup screen
//       ) : (
//         <div>
//           <h1>
//             {`${responseData.metadata.title} - ${responseData.metadata.length} - ${responseData.metadata.creator}`}
//           </h1>
//           <Image
//             src={responseData.metadata.creator_thumbnails.medium.url}
//             alt="Creator PFP"
//             width={100}
//             height={100}
//           />
//           <h2>
//             <div
//               id="g_id_onload"
//               data-client_id="e"
//               data-context="signin"
//               data-ux_mode="popup"
//               data-login_uri="e"
//               data-auto_select="true"
//               data-itp_support="true"
//             ></div>

//             <div
//               className="g_id_signin"
//               data-type="standard"
//               data-shape="pill"
//               data-theme="filled_black"
//               data-text="signin_with"
//               data-size="large"
//               data-logo_alignment="left"
//             ></div>
//           </h2>
//           {responseData.items.map((item: PlaylistItem, index) => (
//             <div key={index}>
//               <h2>{item.snippet.title}</h2>
//               <p>{item.snippet.description}</p>
//               <Image
//                 src={item.snippet.thumbnails.medium.url}
//                 alt={item.snippet.title}
//                 width={320}
//                 height={180}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       ;
//     </>
//   );
// }
