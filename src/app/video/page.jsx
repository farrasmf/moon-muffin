import CustomFileInput from "@/components/customFileInput";
import SignatureInput from "@/components/SignatureInput";
import VideoModal from "@/components/videoModal";
export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="md:px-40 sm:px-8 px-4 py-24">
        <div className="w-full relative flex justify-center items-center">
          <h1 className="text-5xl md:text-5xl font-medium text-green-700">Record video & buat pesan mu!</h1>
        </div>

        <div className="w-full mt-24 px-4 sm:px-8 md:px-56">
          <form action="">
            {[1, 2].map((nomor) => (
              <div key={nomor} className="border-2 rounded-xl p-4 mb-4 bg-white">
                <h2 className="text-2xl text-green-700 mb-4">Pesanan {nomor}</h2>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xl text-green-700" htmlFor={`jumlahItem-${nomor}`}>
                    Jumlah Item
                  </label>
                  <input className="w-full  border-2 border-[#C9CDC2] rounded-xl p-4 text-xl text-gray-500" type="number" id={`jumlahItem-${nomor}`} name={`jumlahItem-${nomor}`} value="10" disabled />
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xl text-green-700" htmlFor={`alamat-${nomor}`}>
                    Alamat Pengiriman
                  </label>
                  <input className="w-full border-2 border-[#C9CDC2] rounded-xl p-4 text-xl text-gray-500" type="text" id={`alamat-${nomor}`} name={`alamat-${nomor}`} value="Jl. Dummy No. 123" disabled />
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xl text-green-700" htmlFor={`kota-${nomor}`}>
                    Kota
                  </label>
                  <input className="w-full border-2 border-[#C9CDC2] rounded-xl p-4 text-xl text-gray-500" type="text" id={`kota-${nomor}`} name={`kota-${nomor}`} value="Jakarta" disabled />
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-xl text-green-700" htmlFor={`provinsi-${nomor}`}>
                      Provinsi
                    </label>
                    <input className="w-full border-2 border-[#C9CDC2] rounded-xl p-4 text-xl text-gray-500" type="text" id={`provinsi-${nomor}`} name={`provinsi-${nomor}`} value="DKI Jakarta" disabled />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <label className="text-xl text-green-700" htmlFor={`kodePos-${nomor}`}>
                      Kode Pos
                    </label>
                    <input className="w-full border-2 border-[#C9CDC2] rounded-xl p-4 text-xl text-gray-500" type="text" id={`kodePos-${nomor}`} name={`kodePos-${nomor}`} value="12345" disabled />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xl text-green-700">THR</label>
                  <p className="text-green-700 bg-gray-200 rounded-full px-2 py-1 inline-block" style={{ width: "fit-content" }}>
                    Rp. 10.000
                  </p>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <VideoModal />
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xl text-green-700" htmlFor={`pesan-${nomor}`}>
                    Pesan
                  </label>
                  <textarea className="w-full h-80 bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" id={`pesan-${nomor}`} name={`pesan-${nomor}`} placeholder="Masukan pesan kamu" required />
                </div>
                <SignatureInput />
                <div className="flex justify-start items-center mb-8 gap-2">
                  <input type="checkbox" id={`checkbox-${nomor}`} className="w-4 h-4 bg-transparent peer-checked:bg-transparent " />
                  <label className="text-xl text-[#383C33]">Setuju kalau video kamu tayang di web</label>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center">
              <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511]">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}