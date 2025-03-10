import CustomFileInput from "@/components/customFileInput";

export default function OrderPage() {
    return (
        <div className="min-h-screen bg-[#EDF0E7]">
            <div className="px-40 py-24">
                <div className="w-full relative flex justify-center items-center">
                    <h1 className="text-5xl md:text-5xl font-medium text-green-700">
                        Pesan sekarang, jangan cuma wacana
                    </h1>

                    <div className="bg-[#EDF0E7] absolute top-[0%] right-[23%] px-1 py-1">
                        <img
                            src="/assets/icons/wacana-word.svg"
                            className=""
                            alt="icon"
                        />
                    </div>
                </div>

                <div className="w-full mt-24 px-56">
                    <form action="">
                        <div className="flex flex-col gap-2 mb-6">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="name"
                            >
                                Nama
                            </label>
                            <input
                                className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                                type="text"
                                id="name"
                                name="name"
                                value={""}
                                onChange={""}
                                placeholder="Masukan nama kamu"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 mb-6">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="name"
                            >
                                Alamat email
                            </label>
                            <input
                                className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                                type="email"
                                id="email"
                                name="email"
                                value={""}
                                onChange={""}
                                placeholder="Masukan email kamu"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 mb-6 relative">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="jumlahPesanan"
                            >
                                Jumlah pesanan
                            </label>
                            <div className="relative">
                                <select
                                    name="jumlahPesanan"
                                    id="jumlahPesanan"
                                    className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl appearance-none text-gray-400"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" className="text-gray-400" disabled>Masukan jumlah pemesanan</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-6">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="name"
                            >
                                Alamat pemesanan
                            </label>
                            <input
                                className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                                type="text"
                                id="alamat"
                                name="alamat"
                                value={""}
                                onChange={""}
                                placeholder="Masukan alamat pesanan"
                                required
                            />
                        </div>

                        <CustomFileInput />

                        <div className="flex flex-col gap-2 mb-6">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="name"
                            >
                                Pesan
                            </label>

                            <textarea
                                className="w-full h-80 bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl"
                                id="pesan"
                                name="pesan"
                                value={""}
                                onChange={""}
                                placeholder="Masukan pesan kamu"
                                required
                            />
                        </div>

                        <CustomFileInput />

                        <div className="flex justify-between mb-2">
                            <label
                                className="text-xl text-green-700"
                                htmlFor="name"
                            >
                                Tambah THR
                            </label>

                            <label class="relative inline-block w-14 h-8 cursor-pointer">
                                <input type="checkbox" class="peer sr-only" />
                                <div class="w-full h-full rounded-full bg-white peer-checked:bg-white border-2 border-[#C9CDC2] transition-colors duration-300 ease-in-out"></div>
                                <div class="absolute left-1 top-1 bg-[#383C33] w-6 h-6 rounded-full peer-checked:translate-x-6 transition-transform duration-300 ease-in-out"></div>
                            </label>
                        </div>

                        <div className="flex justify-start mb-6 gap-2">
                            <button className="border-2 border-[#C9CDC2] w-[15%] py-2 rounded-full text-2xl font-medium">Rp.20.000</button>
                            <button className="border-2 border-[#C9CDC2] w-[15%] py-2 rounded-full text-2xl font-medium">Rp.50.000</button>
                            <button className="border-2 border-[#C9CDC2] w-[15%] py-2 rounded-full text-2xl font-medium">Rp.100.000</button>
                            <button className="border-2 border-[#C9CDC2] w-[15%] py-2 rounded-full text-2xl font-medium">Rp.150.000</button>
                        </div>

                        <div className="flex justify-start items-center mb-8 gap-2">
                            <input type="checkbox" id="checkbox" className="w-4 h-4 bg-transparent peer-checked:bg-transparent " />
                            <label className="text-xl text-[#383C33]">Setuju kalau video kamu tayang di web</label>
                        </div>

                        <div className="flex justify-center items-center">
                            <button className="bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511]">
                                Proses Pembayaran
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}