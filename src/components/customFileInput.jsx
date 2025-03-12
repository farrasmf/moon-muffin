"use client";

import { useState, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const CustomFileInput = () => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const { startRecording, stopRecording, mediaBlobUrl, status } = useReactMediaRecorder({ video: true });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label className="text-xl text-green-700" htmlFor="file">
        Video Ucapan
      </label>

      {/* Hidden original file input */}
      <input type="file" id="file" name="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="video/*" required />

      {/* Custom file input UI */}
      <div className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl flex items-center cursor-pointer relative" onClick={handleContainerClick}>
        {/* Placeholder or filename */}
        <div className={`flex-grow truncate ${!fileName ? "text-gray-400" : "text-gray-900"}`}>{fileName || "Silahkan masukan video kamu"}</div>

        {/* Plus icon at the right */}
        <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>

      {/* Button to record video */}
      <button onClick={status === "recording" ? stopRecording : startRecording} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        {status === "recording" ? "Stop Recording" : "Record Video"}
      </button>

      {/* Display recorded video */}
      {mediaBlobUrl && <video src={mediaBlobUrl} controls className="mt-4 w-full" />}
    </div>
  );
};

export default CustomFileInput;
