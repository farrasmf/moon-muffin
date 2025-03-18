"use client";

import { useState, use } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default function OrderSuccess({ params }) {
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [copiedOrderUrl, setCopiedOrderUrl] = useState(false);

  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const orderId = slug;
  const orderUrl = `https://moonmuffin.byc.plus/content/${slug}`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "orderId") {
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    } else {
      setCopiedOrderUrl(true);
      setTimeout(() => setCopiedOrderUrl(false), 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  bg-[#EDF0E7] px-6">
      <h1 className="md:text-[5svh] text-[3.3svh] mt-[5svh] font-medium text-green-700 flex flex-wrap items-center text-center">
        Pesananmu sudah berhasil dibuat!
      </h1>
      <p className="text-green-700 text-base">
        Upload Video Ucapan & Pesanmu di Sini!
      </p>

      <div className="flex flex-col items-center rounded-lg w-full max-w-md mx-auto">
        <div className="mt-2 bg-white p-2 rounded-lg flex items-center w-full justify-between">
          <span className="text-black font-semibold">Order ID: {orderId}</span>
          <button
            onClick={() => handleCopy(orderId, "orderId")}
            className="text-gray-400 hover:text-white"
          >
            {copiedOrderId ? (
              <Image
                src="/assets/icons/check.svg"
                alt="Copied"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/assets/icons/copy.svg"
                alt="Copy"
                width={16}
                height={16}
              />
            )}
          </button>
        </div>

        <div className="mt-4 bg-white p-4 rounded-lg flex justify-center items-center w-full">
          <QRCodeSVG
            value={orderUrl}
            size={240}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="mt-4 bg-white p-2 rounded-lg flex items-center w-full justify-between">
          <span className="text-black truncate w-4/5">{orderUrl}</span>
          <button
            onClick={() => handleCopy(orderUrl, "orderUrl")}
            className="text-gray-400 hover:text-white"
          >
            {copiedOrderUrl ? (
              <Image
                src="/assets/icons/check.svg"
                alt="Copied"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/assets/icons/copy.svg"
                alt="Copy"
                width={16}
                height={16}
              />
            )}
          </button>
        </div>
        <Link href={orderUrl}>
          <button className="mt-4 bg-[#92ED00] text-[#046511] py-2 px-4 rounded-full hover:bg-green-600 w-full text-center font-semibold">
            Tambah Video Ucapan ➜
          </button>
        </Link>
      </div>
    </div>
  );
}
