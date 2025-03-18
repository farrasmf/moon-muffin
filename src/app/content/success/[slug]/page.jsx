"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { validateOrderId } from "@/actions/contentActions";

export default function SuccessPage() {
  const params = useParams();
  const orderId = params.slug;
  const [isOrderValid, setIsOrderValid] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // Validasi order_id saat komponen dimuat
  useEffect(() => {
    async function checkOrderValidity() {
      setIsValidating(true);
      try {
        const isValid = await validateOrderId(orderId);
        setIsOrderValid(isValid);
      } catch (error) {
        console.error("Error validasi order:", error);
      } finally {
        setIsValidating(false);
      }
    }

    checkOrderValidity();
  }, [orderId]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-xl text-center text-green-700">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isOrderValid) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-medium text-red-700 mb-4">Order Tidak Valid</h1>
          <p className="text-lg text-gray-700 mb-6">Maaf, order yang Anda cari tidak ditemukan.</p>
          <div className="flex justify-center">
            <Link href="/" className="bg-[#92ED00] px-6 py-3 rounded-full font-medium text-xl text-[#046511]">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-medium text-green-700 mb-4">Berhasil!</h1>
          <p className="text-lg text-gray-700 mb-6">Terima kasih! Video dan pesan Anda telah berhasil disimpan.</p>
          <Link href="/" className="bg-[#92ED00] px-6 py-3 rounded-full font-medium text-xl text-[#046511]">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
