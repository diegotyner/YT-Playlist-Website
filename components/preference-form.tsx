"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { updateMetadata } from "@/utils/queries/updateMetadata";

interface PreferenceProps {
  id: string;
  username: string;
  thumbnail?: string;
}
const PreferenceForm = ({ id, username, thumbnail }: PreferenceProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [displayName, setDisplayName] = useState<string>(username);
  const [PFP, setPFP] = useState<string | null>(thumbnail || null);
  const noPFP = "/icons/add_pfp.svg";
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (displayName && PFP) {
        const response = await updateMetadata(id, displayName, PFP);
        if (!response) {
          throw new Error("Update was not successful")
        }
        if (pathname == "/profile/configure/set-up") router.push('/profile/configure');
      }; 

      alert("Preferences saved successfully")
    } catch (error) {
      alert("Submission Failed")
      console.error('Error:', error);
    }
  };

  const image_list = [
    "https://yt3.ggpht.com/-_fExgATRXLY/AAAAAAAAAAI/AAAAAAAAAAA/-fmo8LhN7Pg/s240-c-k-no-rj-c0xffffff/photo.jpg",
    "https://i.pinimg.com/736x/99/6c/a6/996ca6d41ae979589d3f50e0967cdcb9.jpg",
    "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
  ];

  if (thumbnail && !image_list.includes(thumbnail)) image_list.push(thumbnail);
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>

        <div className="flex justify-between border-2 border-indigo-600">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            className="bg-gray-200"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          ></input>
        </div>

        <div className="border-2 border-teal-600">
          <label>Set Profile Picture</label>
          <div className="flex place-items-center">
            <img
              src={ PFP || noPFP }
              alt="Current PFP"
              className="clickable" // Should probably set image contain properties
              width={100}
              height={100}
              onClick={() => setShowForm((prev) => !prev)}
            />
            {showForm && (
              <ImageSelect
                imageList={image_list}
                selected={PFP}
                callback={setPFP}
              />
            )}
          </div>
        </div>

        <button type="submit" className="clickable bg-green-400 rounded-lg text-center">Save Preferences</button>
      </form>
    </div>
  );
};

function ImageSelect({
  imageList,
  selected,
  callback,
}: {
  imageList: string[];
  selected: string | null;
  callback: (value: string) => void;
}) {
  return (
    <div>
      {imageList.map((url) => (
        <div
          key={url}
          className={`image-option p-2 clickable ${
            url === selected ? "border-blue-800 border-4" : ""
          }`}
          onClick={() => {
            callback(url);
            console.log(url, selected);
          }}
        >
          <img
            src={url}
            alt="PFP option"
            className="inset-3" // Should probably set image contain properties
            height="100px"
            width={100}
          />
        </div>
      ))}
    </div>
  );
}

export default PreferenceForm;
