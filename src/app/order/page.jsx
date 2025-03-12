"use client";

import { useState } from "react";
import CustomFileInput from "@/components/customFileInput";

function Pesanan({ nomor, handleRemove, handleTHRChange, selectedTHR }) {
  return (
    <div className="border-2 rounded-xl p-4 mb-4 bg-white">
      <h2 className="text-2xl text-green-700 mb-4">Pesanan {nomor}</h2>
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xl text-green-700" htmlFor={`jumlahItem-${nomor}`}>
          Jumlah Item
        </label>
        <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="number" id={`jumlahItem-${nomor}`} name={`jumlahItem-${nomor}`} placeholder="Masukan jumlah item" required />
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xl text-green-700" htmlFor={`alamat-${nomor}`}>
          Alamat Pengiriman
        </label>
        <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id={`alamat-${nomor}`} name={`alamat-${nomor}`} placeholder="Masukan alamat pengiriman" required />
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xl text-green-700" htmlFor={`kota-${nomor}`}>
          Kota
        </label>
        <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id={`kota-${nomor}`} name={`kota-${nomor}`} placeholder="Masukan kota" required />
      </div>
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-xl text-green-700" htmlFor={`provinsi-${nomor}`}>
            Provinsi
          </label>
          <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id={`provinsi-${nomor}`} name={`provinsi-${nomor}`} placeholder="Masukan provinsi" required />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-xl text-green-700" htmlFor={`kodePos-${nomor}`}>
            Kode Pos
          </label>
          <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id={`kodePos-${nomor}`} name={`kodePos-${nomor}`} placeholder="Masukan kode pos" required />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-xl text-green-700">Tambah THR</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => handleTHRChange(nomor, 5000)} className={`px-4 py-2 rounded-full ${selectedTHR[nomor] === 5000 ? "bg-green-300" : "bg-gray-200"}`}>
            Rp. 5.000
          </button>
          <button type="button" onClick={() => handleTHRChange(nomor, 10000)} className={`px-4 py-2 rounded-full ${selectedTHR[nomor] === 10000 ? "bg-green-300" : "bg-gray-200"}`}>
            Rp. 10.000
          </button>
          <button type="button" onClick={() => handleTHRChange(nomor, 15000)} className={`px-4 py-2 rounded-full ${selectedTHR[nomor] === 15000 ? "bg-green-300" : "bg-gray-200"}`}>
            Rp. 15.000
          </button>
        </div>
        {selectedTHR[nomor] && <p className="text-green-700 mt-2">THR yang dipilih: Rp. {selectedTHR[nomor].toLocaleString()}</p>}
      </div>
      <button type="button" onClick={() => handleRemove(nomor)} className="text-red-500">
        Hapus Pesanan
      </button>
    </div>
  );
}

export default function OrderPage() {
  const [pesananList, setPesananList] = useState([1]);
  const [selectedTHR, setSelectedTHR] = useState({});

  const addPesanan = () => {
    setPesananList([...pesananList, pesananList.length + 1]);
  };

  const removePesanan = (nomor) => {
    setPesananList(pesananList.filter((item) => item !== nomor));
  };

  const handleTHRChange = (nomor, value) => {
    setSelectedTHR({ ...selectedTHR, [nomor]: value });
  };

  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="px-40 py-24">
        <div className="w-full relative flex justify-center items-center">
          <h1 className="text-5xl md:text-5xl font-medium text-green-700">Pesan sekarang, jangan cuma wacana</h1>

          <div className="bg-[#EDF0E7] absolute top-[0%] right-[23%] px-1 py-1">
            <img src="/assets/icons/wacana-word.svg" className="" alt="icon" />
          </div>
        </div>

        <div className="w-full mt-24 px-56">
          <form action="">
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor="name">
                Nama
              </label>
              <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id="name" name="name" value={""} onChange={""} placeholder="Masukan nama kamu" required />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor="name">
                Alamat email
              </label>
              <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="email" id="email" name="email" value={""} onChange={""} placeholder="Masukan email kamu" required />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor="whatsapp">
                Nomor WhatsApp
              </label>
              <input className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" type="text" id="whatsapp" name="whatsapp" placeholder="Masukan nomor WhatsApp kamu" required />
            </div>

            {pesananList.map((nomor) => (
              <Pesanan key={nomor} nomor={nomor} handleRemove={removePesanan} handleTHRChange={handleTHRChange} selectedTHR={selectedTHR} />
            ))}

            <div onClick={addPesanan} className="border-2 border-dashed border-gray-400 px-4 py-2 rounded-full text-center cursor-pointer">
              <span className="text-gray-600">Tambah pesanan lain</span>
            </div>

            <div className="flex justify-center items-center mt-8">
              <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511]">Selanjutnya</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
