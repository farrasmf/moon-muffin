import Polaroid from "@/components/polaroid";

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#EDF0E7] flex flex-col items-center pt-10">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-green-700 mb-2 relative">
        Pesan mu
        <img src="/assets/icons/garis-pesanmu.svg" alt="garis bawah" className="absolute -bottom-1 left-0 w-full" />
      </h1>

      {/* Container */}
      <div className="mt-8 flex items-start space-x-6 justify-start w-full pl-6">
        {/* Foto Card */}
        <Polaroid imageURL="/assets/images/dummy-person-1.png" name="Dina" />

        {/* Kotak Tambah Video */}
        <div className="items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 w-[360px] h-[434px] flex flex-col p-4 gap-3">
          <span className="text-3xl text-gray-500">+</span>
          <p className="text-gray-500 mt-2">Tambah video</p>
        </div>
      </div>
    </div>
  );
}
