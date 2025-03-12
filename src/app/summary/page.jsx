"use client";

import { useState } from "react";

export default function SummaryPage() {
  // Contoh data pesanan
  const pesananList = [
    { nomor: 1, jumlahItem: 1, hargaItem: 50000, THR: 5000, biayaPengiriman: 10000 },
    { nomor: 2, jumlahItem: 2, hargaItem: 100000, THR: 10000, biayaPengiriman: 15000 },
  ];

  const calculateTotal = () => {
    return pesananList.reduce((total, pesanan) => {
      return total + pesanan.jumlahItem * pesanan.hargaItem + pesanan.THR + pesanan.biayaPengiriman;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="px-40 py-24">
        <h1 className="text-5xl md:text-5xl font-medium text-green-700 mb-8 text-center">Detail Pesanan Kamu</h1>
        <div className=" p-8">
          {pesananList.map((pesanan) => (
            <div key={pesanan.nomor} className="mb-6">
              <h2 className="text-2xl text-green-700 mb-4">Pesanan {pesanan.nomor}</h2>
              <div className="flex justify-between mb-2">
                <span>Jumlah Item: {pesanan.jumlahItem}x Box MoonMuffin</span>
                <span>Rp. {(pesanan.jumlahItem * pesanan.hargaItem).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>THR</span>
                <span>Rp. {pesanan.THR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Biaya Pengiriman</span>
                <span>Rp. {pesanan.biayaPengiriman.toLocaleString()}</span>
              </div>
              <hr className="my-4 border-gray-300" />
            </div>
          ))}
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total</span>
            <span>Rp. {calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511]">Proses Pembayaran</button>
          </div>
        </div>
      </div>
    </div>
  );
}
