"use client";

import { useState, useRef, useEffect } from "react";

export default function RecordVideoModal({ isOpen, onClose, onSave }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen && !recordedVideoUrl) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, recordedVideoUrl]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          aspectRatio: { ideal: 9 / 16 },
          facingMode: "user",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera. Mohon periksa izin kamera Anda.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    }
  };

  const startRecording = () => {
    if (streamRef.current) {
      setRecordedChunks([]);
      const mimeType = MediaRecorder.isTypeSupported(
        "video/webm;codecs=vp8,opus"
      )
        ? "video/webm;codecs=vp8,opus"
        : "video/webm";

      const options = {
        mimeType,
        audioBitsPerSecond: 128000,
      };

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Wait for the MediaRecorder to finish processing
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        stopCamera();
      };
    }
  };

  const saveRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      onSave(url, blob);
      onClose();
      setRecordedChunks([]);
      setRecordedVideoUrl(null);
      stopCamera();
    }
  };

  const retryRecording = () => {
    setRecordedVideoUrl(null);
    setRecordedChunks([]);
    startCamera();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-auto mx-4 md:max-h-[80svh] md:min-w-[50svh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[2.2svh] font-semibold text-green-700">
            Rekam Video
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 h-full">
          <div className="relative w-[calc((75svh-8rem)*9/16)] min-h-[calc(75svh-8rem)] h-fit bg-gray-100 rounded-xl overflow-hidden">
            {recordedVideoUrl ? (
              <video
                src={recordedVideoUrl}
                controls
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          <div className="flex gap-4 w-full justify-center">
            {!isRecording && !recordedVideoUrl ? (
              <button
                onClick={startRecording}
                className="relative w-[7svh] h-[7svh] bg-white rounded-full flex justify-center items-center cursor-pointer shadow-lg p-[0.9svh]"
              >
                <div className="w-full h-full bg-[#92ed00] rounded-full transition-all duration-300 ease-in-out" />
              </button>
            ) : isRecording ? (
              <button
                onClick={stopRecording}
                className="relative w-[7svh] h-[7svh] bg-white rounded-full flex justify-center items-center cursor-pointer shadow-lg p-[0.9svh]"
              >
                <div className="h-[3svh] w-[3svh] bg-[#92ed00] rounded-[0.3rem] transition-all duration-300 ease-in-out" />
              </button>
            ) : (
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <button
                  onClick={retryRecording}
                  className="bg-gray-600 min-w-[20svh] w-full px-6 py-3 rounded-full font-medium text-[2svh] flex-1 text-white hover:bg-gray-700 transition-colors"
                >
                  Take Ulang
                </button>
                <button
                  onClick={saveRecording}
                  className="bg-green-700 min-w-[20svh] w-full  px-6 py-3 rounded-full font-medium text-[2svh] flex-1 text-white hover:bg-green-800 transition-colors"
                >
                  Simpan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
