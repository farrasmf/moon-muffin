"use client";

import { useState } from "react";
import Image from "next/image";
import SignaturePad from "./SignaturePad";

export default function SignatureInput({ onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);

  const handleSaveSignature = (dataUrl) => {
    setSignatureImage(dataUrl);
    onSave(dataUrl);
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label className="text-xl text-green-700" htmlFor="signature">
        Tanda Tangan
      </label>

      <div onClick={() => setIsModalOpen(true)} className="w-full min-h-[160px] bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl flex items-center justify-center cursor-pointer relative">
        {signatureImage ? (
          <Image src={signatureImage} alt="Tanda Tangan" width={320} height={160} className="object-contain" />
        ) : (
          <div className="text-gray-400 flex items-center gap-2">
            <span>Klik untuk membuat tanda tangan</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        )}
      </div>

      <SignaturePad isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveSignature} />
    </div>
  );
}
