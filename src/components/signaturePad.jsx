"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Image from "next/image";

export default function SignaturePad({ isOpen, onClose, onSave }) {
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  // Fungsi untuk menyimpan tanda tangan
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL("image/png");
      setImageURL(dataUrl);
      onSave(dataUrl);
      onClose();
    }
  };

  // Fungsi untuk menghapus tanda tangan
  const clearSignature = () => {
    sigCanvas.current?.clear();
    setImageURL(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700">Tanda Tangan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Canvas untuk tanda tangan */}
        <div className="border border-gray-300 rounded-lg mb-4">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="#046511"
            canvasProps={{
              className: "w-full bg-white rounded-lg",
              width: 500,
              height: 300,
            }}
          />
        </div>

        {/* Tombol kontrol */}
        <div className="flex space-x-2 justify-end">
          <button
            onClick={clearSignature}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Hapus
          </button>
          <button
            onClick={saveSignature}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
