"use client";

import { useState, useEffect, useRef } from 'react';

const PlaylistURLForm = ({ id }: { id: string }) => {
  const [videoURL, setVideoURL] = useState<string>("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [videoURL]);
  

  const isValidPlaylistURL = () => {
    const pattern = /https:\/\/(?:www\.)?youtube\.com\/(?:playlist\?list=([a-zA-Z0-9_-]{34})|watch\?v=([a-zA-Z0-9_-]{11})(?:&list=([a-zA-Z0-9_-]{34}))?)/;
    const match = videoURL.match(pattern);
    return match
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const match = isValidPlaylistURL()
    if (!match) {
      alert(`Submission failed, did you: 
        1) Use a complete playlist or playlist video URL?
        2) Submit a public or unlisted playlist?`)
      return
    }
    const playlistCode = match[1] || match[3];
    console.log(playlistCode);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="">
        <label htmlFor="videoURL">Video URL</label>
        <textarea
          ref={textareaRef}
          className="border-2 border-blue-900"
          id="videoURL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          required
          rows={1}
          style={{ resize: 'none', overflow: 'hidden', width: '100%' }}
        />
        <button type="submit" className="clickable bg-green-400 rounded-lg">
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PlaylistURLForm;


{/* <input
type="text"
className="border-2 border-blue-900 w-full"
id="videoURL"
value={videoURL}
onChange={(e) => setVideoURL(e.target.value)}
required
/>
<span className="min-w-max"> */}