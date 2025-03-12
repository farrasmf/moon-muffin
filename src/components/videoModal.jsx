"use client";

import { useState } from "react";
import { MediaRecorder } from "react-media-recorder";
import { Dialog } from "@headlessui/react";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
    }
  };

  return (
    <>
      {/* Tombol untuk membuka modal */}
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Open Video Modal
      </button>

      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-3 right-3 text-red-500" onClick={() => setIsOpen(false)}>✕</button>

            <MediaRecorder
              video
              render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                <div className="flex flex-col items-center">
                  {mediaBlobUrl || uploadedVideo ? (
                    <video src={mediaBlobUrl || uploadedVideo} controls className="w-full h-60 rounded-md shadow" />
                  ) : (
                    <div className="w-full h-60 flex items-center justify-center border border-dashed rounded-md text-gray-500">
                      <span>Video Preview</span>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={startRecording}>Start</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={stopRecording}>Stop</button>
                  </div>

                  <div className="mt-4 text-center">Atau</div>

                  <input type="file" accept="video/*" className="mt-2" onChange={handleFileUpload} />

                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Upload</button>
                </div>
              )}
            />
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
}
