"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useOrder } from "@/context/OrderContext";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();
  const { orderData, calculateTotal } = useOrder();
  const [pesananList, setPesananList] = useState([]);

  // Harga item dan biaya pengiriman
  const hargaPerItem = 50000; 
  const biayaPengiriman = 10000; 

  useEffect(() => {
    // Cek apakah ada data pesanan, kalau tidak redirect ke create-order
    if (!orderData.pesanan || orderData.pesanan.length === 0) {
      router.push("/create-order");
      return;
    }

    // Format data pesanan untuk tampilan
    const formattedPesanan = orderData.pesanan.map((item) => ({
      nomor: item.nomor,
      jumlahItem: parseInt(item.jumlahItem) || 0,
      hargaItem: hargaPerItem,
      THR: parseInt(orderData.selectedTHR[item.nomor]) || 0,
      biayaPengiriman: biayaPengiriman,
      namaPenerima: item.namaPenerima,
      alamatPengiriman: `${item.alamat}, ${item.kelurahan}, ${item.kecamatan}, ${item.kota}, ${item.provinsi} ${item.kodePos}`,
    }));

    setPesananList(formattedPesanan);
  }, [orderData, router]);

  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="px-40 py-24">
        <h1 className="text-5xl md:text-5xl font-medium text-green-700 mb-8 text-center">Detail Pesanan Kamu</h1>
        <div className="p-8">
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
              <div className="flex justify-between mb-2">
                <span>Penerima</span>
                <span>{pesanan.namaPenerima}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Alamat Pengiriman</span>
                <span className="text-right max-w-[50%]">{pesanan.alamatPengiriman}</span>
              </div>
              <hr className="my-4 border-gray-300" />
            </div>
          ))}
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total</span>
            <span>Rp. {calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between mt-8">
            <Link href="/create-order">
              <button className="px-6 py-4 rounded-full font-medium text-xl text-[#046511] border-2 border-[#046511]">Kembali</button>
            </Link>
            <Link href="/payment-success">
              <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-xl text-[#046511]">Proses Pembayaran</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
