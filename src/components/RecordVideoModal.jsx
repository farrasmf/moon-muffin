"use client";

import { useState, useRef } from "react";

export default function RecordVideoModal({ isOpen, onClose, onSave }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera. Mohon periksa izin kamera Anda.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const saveRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      onSave(url, blob);
      onClose();
      setRecordedChunks([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-700">Rekam Video</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
          </div>

          <div className="flex gap-4">
            {!isRecording ? (
              <button onClick={startRecording} className="bg-red-600 px-6 py-3 rounded-full font-medium text-xl text-white hover:bg-red-700 transition-colors">
                Mulai Rekam
              </button>
            ) : (
              <>
                <button onClick={stopRecording} className="bg-gray-600 px-6 py-3 rounded-full font-medium text-xl text-white hover:bg-gray-700 transition-colors">
                  Stop
                </button>
                <button
                  onClick={saveRecording}
                  disabled={recordedChunks.length === 0}
                  className={`${recordedChunks.length === 0 ? "bg-green-300" : "bg-green-700 hover:bg-green-800"} px-6 py-3 rounded-full font-medium text-xl text-white transition-colors`}
                >
                  Simpan
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
