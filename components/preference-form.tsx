"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { updateMetadata } from "@/utils/queries/updateMetadata";
import CustomAvatar from "./avatar";

interface PreferenceProps {
  id: string;
  username: string;
  thumbnail?: string;
}
const PreferenceForm = ({ id, username, thumbnail }: PreferenceProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [displayName, setDisplayName] = useState<string>(username);
  const [PFP, setPFP] = useState<string | undefined>(thumbnail || undefined);
  const noPFP = "/icons/add_pfp.svg";
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (displayName && PFP) {
        const response = await updateMetadata(id, displayName, PFP);
        if (!response) {
          throw new Error("Update was not successful");
        }
        if (pathname == "/profile/configure/set-up")
          router.push("/profile/configure");
      }

      alert("Preferences saved successfully");
    } catch (error) {
      alert("Submission Failed");
      console.error("Error:", error);
    }
  };

  let image_list = [
    "https://yt3.ggpht.com/-_fExgATRXLY/AAAAAAAAAAI/AAAAAAAAAAA/-fmo8LhN7Pg/s240-c-k-no-rj-c0xffffff/photo.jpg",
    "https://i.pinimg.com/736x/99/6c/a6/996ca6d41ae979589d3f50e0967cdcb9.jpg",
    "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg",
    "https://i.pinimg.com/originals/3e/cd/a8/3ecda88c3fa652a0e5177b78bb9ea896.jpg",
    "https://www.imagella.com/cdn/shop/files/beabe147792a8f3a7e7303310467cdec.jpg?v=1720562257",
    "https://i.pinimg.com/originals/c8/38/37/c838377bce32be49107487bd075c82d5.jpg",
    "https://i.pinimg.com/originals/7b/d6/08/7bd608398ca3efe1eacc2335c33b8ba2.jpg",
    "https://alohademele.com/cdn/shop/products/MalaMia_Pua_f77aeacf-c4ac-416e-930f-c9199acf2ae3_720x.jpg?v=1593331311",
    "https://www.dutchgrown.com/cdn/shop/files/Peony_Lorelei-4_580x773.jpg?v=1689334322",
    "https://i.pinimg.com/originals/a3/35/13/a33513fdd182d12a9688325a059f5b3b.jpg",
    "https://i.pinimg.com/originals/a0/a1/f0/a0a1f0fa7e435ca95a728c3ee8de0db7.jpg",
    "https://i.pinimg.com/originals/a3/e9/4b/a3e94b26009bac0ef6c9a04d9090be4b.jpg",
    "/icons/trash.svg",
    "/icons/wrench.svg",
  ];

  if (thumbnail && !image_list.includes(thumbnail))
    image_list = [thumbnail].concat(image_list);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center xl:flex-row xl:justify-around xl:items-start">
        <div className="flex flex-col justify-evenly xl:w-1/4 xl:mt-20 border border-indigo-600 p-4 rounded-lg">
          <label htmlFor="displayName" className="text-center text-xl">Display Name</label>
          <input
            type="text"
            className="bg-gray-100 text-center rounded-xl"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          ></input>
        </div>

        <div className="border w-7/12 border-teal-600 my-2 flex flex-col items-center py-5 rounded-lg">
          <h2 className="text-xl">Set Profile Picture</h2 >
          <div className="flex items-center justify-evenly md:flex-col m-4 mt-0">
            <div
              className="clickable bg-blackA1 inline-flex h-[75px] w-[75px] select-none items-center justify-center overflow-hidden rounded-full align-middle min-w-[75px] m-4"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <img
                src={PFP}
                className="h-full w-full rounded-[inherit] object-cover border-[3px] border-neutral-400"
                alt="Profile Picture"
              />
            </div>
            {showForm && (
              <ImageSelect
                imageList={image_list}
                selected={PFP}
                callback={setPFP}
              />
            )}
          </div>
          <button
            type="submit"
            className="clickable bg-green-400 rounded-2xl text-center py-1 px-3"
          >
            Save Preferences
          </button>
        </div>


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
  selected?: string;
  callback: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center max-w-[610px]">
      {imageList.map((url) => (
        <div
          key={url}
          className={`clickable m-[3px]`}
          onClick={() => {
            callback(url);
            console.log(url, selected);
          }}
        >
          <CustomAvatar avatar_url={url} selected={url === selected} />
        </div>
      ))}
    </div>
  );
}

export default PreferenceForm;
