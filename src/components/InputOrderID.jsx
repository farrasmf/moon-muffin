"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function InputOrderID() {
  const [orderID, setOrderID] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (orderID.trim()) {
      router.push(`/order/${orderID}`);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl font-semibold text-green-700 flex items-center justify-center">
        Masukan
        
        <svg className="w-32 h-32" version="1.0" xmlns="http://www.w3.org/2000/svg" width="258.000000pt" height="108.000000pt" viewBox="0 0 258.000000 108.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,108.000000) scale(0.050000,-0.050000)" fill="#f77b29" stroke="none">
            <path d="M2055 1778 c-30 -17 -35 -51 -35 -226 l0 -207 -81 -11 c-323 -43 -522 -693 -252 -821 149 -71 377 -41 498 66 l70 61 88 -31 c159 -57 318 -60 383 -9 101 80 37 221 -72 162 -67 -36 -234 -11 -319 46 -111 76 -82 456 33 413 26 -10 123 -25 215 -32 220 -18 266 12 266 174 0 321 -396 371 -600 75 -70 -101 -68 -107 -55 108 14 228 -27 297 -139 232z m601 -342 c55 -55 27 -78 -89 -72 -122 6 -156 36 -83 71 62 30 143 30 172 1z m-636 -524 l0 -248 -75 -8 c-165 -20 -195 1 -193 135 3 184 112 369 218 369 l50 0 0 -248z" />{" "}
            <path d="M4110 1747 c-39 -59 -29 -208 52 -775 50 -353 54 -360 175 -343 504 71 739 691 397 1048 -136 141 -547 188 -624 70z m450 -152 c157 -107 209 -393 102 -560 -100 -155 -292 -260 -311 -170 -12 58 -91 698 -91 742 0 54 215 46 300 -12z" />{" "}
            <path d="M3821 1731 c-17 -20 -21 -87 -12 -225 6 -108 21 -380 33 -606 22 -421 31 -460 108 -460 88 0 94 34 72 364 -11 168 -26 441 -34 606 -7 165 -22 311 -33 325 -27 34 -105 32 -134 -4z" />{" "}
            <path d="M3019 1646 c-133 -91 -176 -414 -112 -846 25 -168 25 -170 86 -176 100 -10 105 13 87 386 -10 187 -11 372 -3 410 l15 70 135 -5 c143 -6 195 34 151 118 -39 75 -271 103 -359 43z" />{" "}
            <path d="M550 1622 c-122 -57 -211 -160 -208 -243 1 -38 -22 -136 -52 -217 -160 -446 16 -883 369 -917 120 -12 288 128 398 331 l62 114 0 -96 c1 -119 29 -174 88 -174 85 0 93 31 93 351 0 449 38 592 169 639 49 17 61 12 108 -46 101 -123 227 -48 152 91 -92 170 -367 171 -480 3 -49 -73 -78 -73 -108 0 -74 178 -378 263 -591 164z m359 -165 c217 -99 149 -656 -115 -948 -314 -347 -542 412 -242 806 31 40 46 80 39 99 -25 65 203 95 318 43z" />{" "}
          </g>
        </svg>
        kamu
      </h1>
      <div className="mt-16 flex items-center space-x-2">
        {/* Input Box dengan border-b */}
        <div className="border-b h-12 border-gray-700 w-full max-w-sm">
          <input type="text" placeholder=". . . . . ." value={orderID} onChange={(e) => setOrderID(e.target.value)} className="w-full text-center text-2xl outline-none bg-transparent placeholder-gray-300 tracking-[0.5em]" />
        </div>
        {/* Tombol Submit */}
        <button onClick={handleSubmit} className="bg-lime-400 text-white p-3 rounded-full hover:bg-lime-500 transition">
          <Image src="/assets/icons/arrow-right-icon.svg" alt="Arrow" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
