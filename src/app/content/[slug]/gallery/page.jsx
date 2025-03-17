"use client";

import Polaroid from "@/components/Polaroid";
import PreviewModal from "@/components/PreviewModal";
import { useState } from "react";

export default function OrderPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#EDF0E7] flex flex-col items-center pt-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-2 relative px-4">
        Pesan mu
        <img
          src="/assets/icons/garis-pesanmu.svg"
          alt="garis bawah"
          className="absolute -bottom-1 left-0 w-full"
        />
      </h1>

      {/* Container */}
      <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 justify-start w-full px-4 sm:pl-6">
        {/* Foto Card */}
        <div onClick={handleOpenPreview} className="cursor-pointer">
          <Polaroid imageURL="/assets/images/dummy-person-1.png" name="Dina" />
        </div>

        {/* Kotak Tambah Video */}
        <div className="items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 w-full sm:w-[360px] h-[434px] flex flex-col p-4 gap-3">
          <span className="text-3xl text-gray-500">+</span>
          <p className="text-gray-500 mt-2">Tambah video</p>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        imageURL="/assets/images/dummy-person-1.png"
        name="Dina"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        signature="/assets/images/dummy-signature.png"
      />
    </div>
  );
}
