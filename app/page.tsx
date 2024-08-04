"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";
import { PlaylistItem } from "@/models/playlist";
import Image from "next/image";

interface payload {
  metadata: {
    title: string;
    length: number;
    creator: string;
    thumbnails: { [key: string]: { url: string } };
  };
  items: PlaylistItem[];
}
export default function Home() {
  const [responseData, setResponseData] = useState<payload | null>(null);
  const examplePlaylist = "PLw5btzHeU_u9l7tYGZuHab0fV3RFW27No";
  useEffect(() => {
    fetch(`/api/create/${examplePlaylist}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponseData(data);
      });
  }, []);

  return (
    <>
      {!responseData ? (
        <p>
          Loading data... (First loadup of backend server tends to be a bit
          slow, 5 seconds expected)
        </p> // Add loadup screen
      ) : (
        <div>
          <h1>
            {`${responseData.metadata.title} - ${responseData.metadata.length} - ${responseData.metadata.creator}`}
          </h1>
          <Image
            src={responseData.metadata.thumbnails.medium.url}
            alt="Creator PFP"
            width={100}
            height={100}
          />
          <h2>
            <div
              id="g_id_onload"
              data-client_id="e"
              data-context="signin"
              data-ux_mode="popup"
              data-login_uri="e"
              data-auto_select="true"
              data-itp_support="true"
            ></div>

            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="filled_black"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
            ></div>
          </h2>
          {responseData.items.map((item: PlaylistItem, index) => (
            <div key={index}>
              <h2>{item.snippet.title}</h2>
              <p>{item.snippet.description}</p>
              <Image
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
                width={320}
                height={180}
              />
            </div>
          ))}
        </div>
      )}
      ;
    </>
  );
}
