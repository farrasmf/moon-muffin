"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ARExperience() {
    const [bgColorScan, setBgColorScan] = useState("#EDF0E7");

    useEffect(() => {
        const header = document.getElementById("page-header");
        if (header) {
          header.style.background = "linear-gradient(to right, #EDF0E7 50%, #C9CDC2 50%)";
          setBgColorScan("#C9CDC2");
        }
    
        return () => {
          if (header) {
            header.style.background = ""; 
          }
        };
      }, []);

    return (
      <div className="flex h-screen w-full">
        {/* Kiri - Record Video */}
        <div className="flex flex-1 flex-col items-center justify-center bg-[#EDF0E7]">
          <img src="/record-video.png" alt="Record Video" className="w-100 h-100" />
          <Link href="/orderer">
          <button className="mt-4 bg-lime-400 text-[#046511] px-6 py-2 rounded-full text-lg font-semibold">
            Record Video
          </button>
          </Link>
        </div>
        
        {/* Kanan - Scan AR */}
        <div className="flex flex-1 flex-col items-center justify-center" style={{ backgroundColor: bgColorScan }}>
          <img src="/scan-ar.png" alt="Scan AR" className="w-100 h-100" />
          <button className="mt-4 bg-white text-[#046511] px-6 py-2 rounded-full text-lg font-semibold border">
            Scan AR
          </button>
        </div>
      </div>
    );
  }