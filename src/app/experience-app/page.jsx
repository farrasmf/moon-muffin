"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ARExperience() {
  const [bgColorScan, setBgColorScan] = useState("#EDF0E7");

  return (
    <div className="flex h-screen min-h-screen max-h-screen w-full flex-col md:flex-row  bg-[#EDF0E7]">
      {/* Kiri - Record Video */}
      <div className="flex flex-1 h-[47.5svh] md:h-full flex-col items-center p-[8svh] pt-[14svh] md:pt-[8svh] justify-center ">
        <div className="flex flex-col items-center justify-center md:h-[25svw] h-[30svh] ">
          <img
            src="/assets/images/record-video.png"
            alt="Record Video"
            className="md:w-[30svw] w-[30svh] h-auto "
          />
        </div>
        <Link href="/content">
          <button className="mt-4 bg-lime-400 text-[#046511] px-6 py-2 rounded-full text-lg font-semibold">
            Tambahkan Konten
          </button>
        </Link>
      </div>

      {/* Kanan - Scan AR */}
      <div className="flex flex-1 h-[47.5svh] md:h-full flex-col items-center p-[8svh] justify-center bg-[#C9CDC2]">
        <div className="flex flex-col items-center justify-center md:h-[25svw] h-[30svh]">
          <img
            src="/assets/images/scan-ar.png"
            alt="Scan AR"
            className="md:w-[23svw] w-[25svh] h-auto "
          />
        </div>
        <Link href="https://link.byc.plus/moonmuffin-ar">
          <button className="mt-4 bg-white text-[#046511] px-6 py-2 rounded-full text-lg font-semibold border">
            Buka Aplikasi AR
          </button>
        </Link>
      </div>
    </div>
  );
}
