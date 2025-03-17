import SignatureInput from "@/components/SignatureInput";
import VideoModal from "@/components/videoModal";
export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="md:px-40 sm:px-8 px-4 py-24">
        <div className="w-full relative flex justify-center items-center">
          <h1 className="text-5xl md:text-5xl font-medium text-green-700">
            Record video & buat pesan mu!
          </h1>
        </div>

        <div className="w-full mt-24 px-4 sm:px-8 md:px-56">
          <form action="">
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor={`pesan`}>
                Nama
              </label>
              <input
                className="w-full  bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                id={`pesan`}
                name={`pesan`}
                placeholder="Masukan Nama kamu"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor={`pesan`}>
                Tambahkan Video
              </label>
              <VideoModal />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xl text-green-700" htmlFor={`pesan`}>
                Pesan
              </label>
              <textarea
                className="w-full h-80 bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                id={`pesan`}
                name={`pesan`}
                placeholder="Masukan pesan kamu"
                required
              />
            </div>
            <SignatureInput />
            <div className="flex justify-start items-center mb-8 gap-2">
              <input
                type="checkbox"
                id={`checkbox`}
                className="w-4 h-4 bg-transparent peer-checked:bg-transparent "
              />
              <label className="text-xl text-[#383C33]">
                Setuju kalau video kamu tayang di web
              </label>
            </div>

            <div className="flex justify-center items-center">
              <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511]">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
