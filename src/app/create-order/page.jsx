"use client";

import { useState, useEffect } from "react";

// Dummy data for provinces
const dummyProvinces = [
  { code: "31", name: "DKI JAKARTA" },
  { code: "32", name: "JAWA BARAT" },
  { code: "36", name: "BANTEN" },
];

// Dummy data for regencies (cities)
const dummyRegencies = {
  31: [
    // DKI JAKARTA
    { code: "31.71", name: "KOTA JAKARTA PUSAT", province_code: "31" },
    { code: "31.72", name: "KOTA JAKARTA UTARA", province_code: "31" },
    { code: "31.73", name: "KOTA JAKARTA BARAT", province_code: "31" },
    { code: "31.74", name: "KOTA JAKARTA SELATAN", province_code: "31" },
    { code: "31.75", name: "KOTA JAKARTA TIMUR", province_code: "31" },
  ],
  32: [
    // JAWA BARAT
    { code: "32.74", name: "KOTA BOGOR", province_code: "32" },
    { code: "32.75", name: "KOTA DEPOK", province_code: "32" },
    { code: "32.76", name: "KOTA BEKASI", province_code: "32" },
    { code: "32.01", name: "KABUPATEN BOGOR", province_code: "32" },
    { code: "32.16", name: "KABUPATEN BEKASI", province_code: "32" },
  ],
  36: [
    // BANTEN
    { code: "36.71", name: "KOTA TANGERANG", province_code: "36" },
    { code: "36.72", name: "KOTA TANGERANG SELATAN", province_code: "36" },
    { code: "36.03", name: "KABUPATEN TANGERANG", province_code: "36" },
  ],
};

// Dummy data for districts
const dummyDistricts = {
  31.71: [
    // JAKARTA PUSAT
    { code: "31.71.01", name: "TANAH ABANG", regency_code: "31.71" },
    { code: "31.71.02", name: "MENTENG", regency_code: "31.71" },
    { code: "31.71.03", name: "SENEN", regency_code: "31.71" },
    { code: "31.71.04", name: "JOHAR BARU", regency_code: "31.71" },
    { code: "31.71.05", name: "CEMPAKA PUTIH", regency_code: "31.71" },
    { code: "31.71.06", name: "KEMAYORAN", regency_code: "31.71" },
    { code: "31.71.07", name: "SAWAH BESAR", regency_code: "31.71" },
    { code: "31.71.08", name: "GAMBIR", regency_code: "31.71" },
  ],
  31.72: [
    // JAKARTA UTARA
    { code: "31.72.01", name: "PENJARINGAN", regency_code: "31.72" },
    { code: "31.72.02", name: "PADEMANGAN", regency_code: "31.72" },
    { code: "31.72.03", name: "TANJUNG PRIOK", regency_code: "31.72" },
    { code: "31.72.04", name: "KOJA", regency_code: "31.72" },
    { code: "31.72.05", name: "KELAPA GADING", regency_code: "31.72" },
    { code: "31.72.06", name: "CILINCING", regency_code: "31.72" },
  ],
  31.73: [
    // JAKARTA BARAT
    { code: "31.73.01", name: "CENGKARENG", regency_code: "31.73" },
    { code: "31.73.02", name: "GROGOL PETAMBURAN", regency_code: "31.73" },
    { code: "31.73.03", name: "TAMAN SARI", regency_code: "31.73" },
    { code: "31.73.04", name: "TAMBORA", regency_code: "31.73" },
    { code: "31.73.05", name: "KEBON JERUK", regency_code: "31.73" },
    { code: "31.73.06", name: "KALIDERES", regency_code: "31.73" },
    { code: "31.73.07", name: "PALMERAH", regency_code: "31.73" },
    { code: "31.73.08", name: "KEMBANGAN", regency_code: "31.73" },
  ],
  31.74: [
    // JAKARTA SELATAN
    { code: "31.74.01", name: "TEBET", regency_code: "31.74" },
    { code: "31.74.02", name: "SETIABUDI", regency_code: "31.74" },
    { code: "31.74.03", name: "MAMPANG PRAPATAN", regency_code: "31.74" },
    { code: "31.74.04", name: "PASAR MINGGU", regency_code: "31.74" },
    { code: "31.74.05", name: "KEBAYORAN LAMA", regency_code: "31.74" },
    { code: "31.74.06", name: "CILANDAK", regency_code: "31.74" },
    { code: "31.74.07", name: "KEBAYORAN BARU", regency_code: "31.74" },
    { code: "31.74.08", name: "PANCORAN", regency_code: "31.74" },
    { code: "31.74.09", name: "JAGAKARSA", regency_code: "31.74" },
    { code: "31.74.10", name: "PESANGGRAHAN", regency_code: "31.74" },
  ],
  31.75: [
    // JAKARTA TIMUR
    { code: "31.75.01", name: "MATRAMAN", regency_code: "31.75" },
    { code: "31.75.02", name: "PULOGADUNG", regency_code: "31.75" },
    { code: "31.75.03", name: "JATINEGARA", regency_code: "31.75" },
    { code: "31.75.04", name: "DUREN SAWIT", regency_code: "31.75" },
    { code: "31.75.05", name: "KRAMAT JATI", regency_code: "31.75" },
    { code: "31.75.06", name: "MAKASAR", regency_code: "31.75" },
    { code: "31.75.07", name: "PASAR REBO", regency_code: "31.75" },
    { code: "31.75.08", name: "CIRACAS", regency_code: "31.75" },
    { code: "31.75.09", name: "CIPAYUNG", regency_code: "31.75" },
    { code: "31.75.10", name: "CAKUNG", regency_code: "31.75" },
  ],
  32.74: [
    // KOTA BOGOR
    { code: "32.74.01", name: "BOGOR SELATAN", regency_code: "32.74" },
    { code: "32.74.02", name: "BOGOR TIMUR", regency_code: "32.74" },
    { code: "32.74.03", name: "BOGOR UTARA", regency_code: "32.74" },
    { code: "32.74.04", name: "BOGOR TENGAH", regency_code: "32.74" },
    { code: "32.74.05", name: "BOGOR BARAT", regency_code: "32.74" },
    { code: "32.74.06", name: "TANAH SAREAL", regency_code: "32.74" },
  ],
  32.75: [
    // KOTA DEPOK
    { code: "32.75.01", name: "PANCORAN MAS", regency_code: "32.75" },
    { code: "32.75.02", name: "CIMANGGIS", regency_code: "32.75" },
    { code: "32.75.03", name: "SAWANGAN", regency_code: "32.75" },
    { code: "32.75.04", name: "LIMO", regency_code: "32.75" },
    { code: "32.75.05", name: "SUKMAJAYA", regency_code: "32.75" },
    { code: "32.75.06", name: "BEJI", regency_code: "32.75" },
    { code: "32.75.07", name: "CIPAYUNG", regency_code: "32.75" },
    { code: "32.75.08", name: "CILODONG", regency_code: "32.75" },
    { code: "32.75.09", name: "CINERE", regency_code: "32.75" },
    { code: "32.75.10", name: "TAPOS", regency_code: "32.75" },
    { code: "32.75.11", name: "BOJONGSARI", regency_code: "32.75" },
  ],
  32.76: [
    // KOTA BEKASI
    { code: "32.76.01", name: "BEKASI TIMUR", regency_code: "32.76" },
    { code: "32.76.02", name: "BEKASI BARAT", regency_code: "32.76" },
    { code: "32.76.03", name: "BEKASI UTARA", regency_code: "32.76" },
    { code: "32.76.04", name: "BEKASI SELATAN", regency_code: "32.76" },
    { code: "32.76.05", name: "RAWALUMBU", regency_code: "32.76" },
    { code: "32.76.06", name: "MEDANSATRIA", regency_code: "32.76" },
    { code: "32.76.07", name: "BANTARGEBANG", regency_code: "32.76" },
    { code: "32.76.08", name: "PONDOKGEDE", regency_code: "32.76" },
    { code: "32.76.09", name: "JATIASIH", regency_code: "32.76" },
    { code: "32.76.10", name: "JATISAMPURNA", regency_code: "32.76" },
    { code: "32.76.11", name: "MUSTIKAJAYA", regency_code: "32.76" },
    { code: "32.76.12", name: "PONDOKMELATI", regency_code: "32.76" },
  ],
  36.71: [
    // KOTA TANGERANG
    { code: "36.71.01", name: "CILEDUG", regency_code: "36.71" },
    { code: "36.71.02", name: "LARANGAN", regency_code: "36.71" },
    { code: "36.71.03", name: "KARANG TENGAH", regency_code: "36.71" },
    { code: "36.71.04", name: "CIPONDOH", regency_code: "36.71" },
    { code: "36.71.05", name: "PINANG", regency_code: "36.71" },
    { code: "36.71.06", name: "TANGERANG", regency_code: "36.71" },
    { code: "36.71.07", name: "KARAWACI", regency_code: "36.71" },
    { code: "36.71.08", name: "JATIUWUNG", regency_code: "36.71" },
    { code: "36.71.09", name: "CIBODAS", regency_code: "36.71" },
    { code: "36.71.10", name: "PERIUK", regency_code: "36.71" },
    { code: "36.71.11", name: "BATUCEPER", regency_code: "36.71" },
    { code: "36.71.12", name: "NEGLASARI", regency_code: "36.71" },
    { code: "36.71.13", name: "BENDA", regency_code: "36.71" },
  ],
  36.72: [
    // KOTA TANGERANG SELATAN
    { code: "36.72.01", name: "SERPONG", regency_code: "36.72" },
    { code: "36.72.02", name: "SERPONG UTARA", regency_code: "36.72" },
    { code: "36.72.03", name: "PONDOK AREN", regency_code: "36.72" },
    { code: "36.72.04", name: "CIPUTAT", regency_code: "36.72" },
    { code: "36.72.05", name: "CIPUTAT TIMUR", regency_code: "36.72" },
    { code: "36.72.06", name: "PAMULANG", regency_code: "36.72" },
    { code: "36.72.07", name: "SETU", regency_code: "36.72" },
  ],
};

// Dummy data for villages (sample for each district with postal codes)
const dummyVillages = {
  "31.71.01": [
    // TANAH ABANG
    {
      code: "31.71.01.1001",
      name: "KEBON MELATI",
      district_code: "31.71.01",
      postal_code: "10230",
    },
    {
      code: "31.71.01.1002",
      name: "KEBON KACANG",
      district_code: "31.71.01",
      postal_code: "10240",
    },
    {
      code: "31.71.01.1003",
      name: "KAMPUNG BALI",
      district_code: "31.71.01",
      postal_code: "10250",
    },
    {
      code: "31.71.01.1004",
      name: "PETAMBURAN",
      district_code: "31.71.01",
      postal_code: "10260",
    },
    {
      code: "31.71.01.1005",
      name: "BENDUNGAN HILIR",
      district_code: "31.71.01",
      postal_code: "10210",
    },
    {
      code: "31.71.01.1006",
      name: "KARET TENGSIN",
      district_code: "31.71.01",
      postal_code: "10220",
    },
  ],
  "31.74.01": [
    // TEBET
    {
      code: "31.74.01.1001",
      name: "TEBET BARAT",
      district_code: "31.74.01",
      postal_code: "12810",
    },
    {
      code: "31.74.01.1002",
      name: "TEBET TIMUR",
      district_code: "31.74.01",
      postal_code: "12820",
    },
    {
      code: "31.74.01.1003",
      name: "MENTENG DALAM",
      district_code: "31.74.01",
      postal_code: "12870",
    },
    {
      code: "31.74.01.1004",
      name: "KEBON BARU",
      district_code: "31.74.01",
      postal_code: "12830",
    },
    {
      code: "31.74.01.1005",
      name: "BUKIT DURI",
      district_code: "31.74.01",
      postal_code: "12840",
    },
  ],
  "32.76.01": [
    // BEKASI TIMUR
    {
      code: "32.76.01.1001",
      name: "MARGAHAYU",
      district_code: "32.76.01",
      postal_code: "17113",
    },
    {
      code: "32.76.01.1002",
      name: "BEKASI JAYA",
      district_code: "32.76.01",
      postal_code: "17112",
    },
    {
      code: "32.76.01.1003",
      name: "DUREN JAYA",
      district_code: "32.76.01",
      postal_code: "17111",
    },
    {
      code: "32.76.01.1004",
      name: "ARE JAYA",
      district_code: "32.76.01",
      postal_code: "17111",
    },
  ],
  "36.71.01": [
    // CILEDUG
    {
      code: "36.71.01.1001",
      name: "CILEDUG INDAH",
      district_code: "36.71.01",
      postal_code: "15151",
    },
    {
      code: "36.71.01.1002",
      name: "SUDIMARA BARAT",
      district_code: "36.71.01",
      postal_code: "15151",
    },
    {
      code: "36.71.01.1003",
      name: "SUDIMARA TIMUR",
      district_code: "36.71.01",
      postal_code: "15151",
    },
    {
      code: "36.71.01.1004",
      name: "SUDIMARA SELATAN",
      district_code: "36.71.01",
      postal_code: "15151",
    },
  ],
};

export default function OrderPage() {
  const [pesananList, setPesananList] = useState([1]);
  const [selectedTHR, setSelectedTHR] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [provinces] = useState(dummyProvinces);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    memo: "",
    message: "",
    pesanan: [
      {
        nomor: 1,
        jumlahItem: "",
        kodePos: "",
        provinsi: "",
        provinceCode: "",
        kota: "",
        regencyCode: "",
        kecamatan: "",
        districtCode: "",
        kelurahan: "",
        villageCode: "",
        alamat: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePesananChange = (nomor, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pesanan:
        prev.pesanan.map((item) =>
          item.nomor === nomor ? { ...item, [field]: value } : item
        ) || [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      selectedFile,
      selectedTHR,
    });
  };

  const addPesanan = () => {
    const newNomor = pesananList.length + 1;
    setPesananList([...pesananList, newNomor]);
    setFormData((prev) => ({
      ...prev,
      pesanan: [
        ...prev.pesanan,
        {
          nomor: newNomor,
          jumlahItem: "",
          kodePos: "",
          provinsi: "",
          provinceCode: "",
          kota: "",
          regencyCode: "",
          kecamatan: "",
          districtCode: "",
          kelurahan: "",
          villageCode: "",
          alamat: "",
        },
      ],
    }));
  };

  const removePesanan = (nomor) => {
    setPesananList(pesananList.filter((item) => item !== nomor));
    setFormData((prev) => ({
      ...prev,
      pesanan: prev.pesanan.filter((item) => item.nomor !== nomor),
    }));
    setSelectedTHR((prev) => {
      const newTHR = { ...prev };
      delete newTHR[nomor];
      return newTHR;
    });
  };

  const handleTHRChange = (nomor, value) => {
    setSelectedTHR({ ...selectedTHR, [nomor]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF0E7] md:px-[8svh] px-[8svw] pt-[20svh] pb-[10svh] flex justify-center items-center">
      <div className="">
        <div className="w-full relative flex justify-center items-center">
          <h1 className="md:text-[5svh] text-[3.5svh] font-medium text-green-700 flex flex-wrap items-center">
            <span>Pesan</span> <span>sekarang,</span> <span>jangan</span>{" "}
            <span>cuma</span>{" "}
            <span className="relative ml-[1.4svh] md:ml-[2svh]">
              <img
                src="/assets/icons/wacana-word.svg"
                className="md:h-[6svh] h-[3.6svh]"
                alt="icon"
              />
            </span>
          </h1>
        </div>

        <div className="w-full md:mt-[8svh] mt-[4svh] ">
          <form action="" onSubmit={handleSubmit}>
            {/* Detail Pemesan */}
            <h2 className="text-2xl text-green-700 mb-4">Detail Pemesan</h2>
            <div className="border-2 rounded-xl p-4 mb-8 bg-white">
              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="name"
                >
                  Nama
                </label>
                <input
                  className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukan nama kamu"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="email"
                >
                  Alamat e-mail
                </label>
                <input
                  className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukan email kamu"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="whatsapp"
                >
                  Nomor WhatsApp
                </label>
                <input
                  className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="Masukan nomor WhatsApp kamu"
                  required
                />
              </div>
            </div>

            {/* Kelengkapan Aksesoris */}
            <h2 className="text-2xl text-green-700 mb-4">
              Kelengkapan Aksesoris
            </h2>
            <div className="border-2 rounded-xl p-4 mb-8 bg-white">
              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="attachment"
                >
                  Foto Polaroid
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div
                    onClick={() =>
                      document.getElementById("attachment").click()
                    }
                    className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-gray-400">
                      {selectedFile
                        ? selectedFile.name
                        : "Upload foto untuk dicetak di polaroid"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="memo"
                >
                  Caption Polariod
                </label>
                <input
                  className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
                  type="text"
                  id="memo"
                  name="memo"
                  value={formData.memo}
                  onChange={handleInputChange}
                  placeholder="Masukan catatan untuk polaroid"
                  required
                />
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label
                  className="md:text-[2.6svh] text-[2.2svh] text-green-700"
                  htmlFor="message"
                >
                  Pesan
                </label>
                <textarea
                  className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Masukan pesanmu untuk dicetak dalam surat"
                  required
                ></textarea>
              </div>
            </div>

            {/* Detail Pesanan */}
            <h2 className="text-2xl text-green-700 mb-4">Detail Pesanan</h2>
            {pesananList.map((nomor) => (
              <Pesanan
                key={nomor}
                nomor={nomor}
                formData={formData}
                handlePesananChange={handlePesananChange}
                handleRemove={removePesanan}
                handleTHRChange={handleTHRChange}
                selectedTHR={selectedTHR}
                provinces={provinces}
              />
            ))}

            <div
              onClick={addPesanan}
              className="border-2 border-dashed border-[#C9CDC2] flex gap-1 items-center justify-center px-4 py-4 rounded-lg text-center cursor-pointer mb-8"
            >
              <span className="text-[#C9CDC2]">Tambah pesanan lain </span>
              <svg
                className="3svh"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49992 1.33203C4.81992 1.33203 1.83325 4.3187 1.83325 7.9987C1.83325 11.6787 4.81992 14.6654 8.49992 14.6654C12.1799 14.6654 15.1666 11.6787 15.1666 7.9987C15.1666 4.3187 12.1799 1.33203 8.49992 1.33203ZM11.8333 8.66536H9.16658V11.332H7.83325V8.66536H5.16658V7.33203H7.83325V4.66536H9.16658V7.33203H11.8333V8.66536Z"
                  fill="#C9CDC2"
                />
              </svg>
            </div>

            <div className="flex justify-center items-center mt-8">
              <button className="bg-[#92ED00] px-[4svh] py-[2svh] rounded-full font-medium text-[2.8svh] text-[#046511]">
                Selanjutnya
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Pesanan({
  nomor,
  formData,
  handlePesananChange,
  handleRemove,
  handleTHRChange,
  selectedTHR,
  provinces,
}) {
  const pesananData = formData.pesanan.find((item) => item.nomor === nomor) || {
    nomor,
    jumlahItem: "",
    kodePos: "",
    provinsi: "",
    provinceCode: "",
    kota: "",
    regencyCode: "",
    kecamatan: "",
    districtCode: "",
    kelurahan: "",
    villageCode: "",
    alamat: "",
  };

  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    province: "",
    regency: "",
    district: "",
    village: "",
  });
  const [dropdownStates, setDropdownStates] = useState({
    province: false,
    regency: false,
    district: false,
    village: false,
  });

  // Load regencies when province changes
  useEffect(() => {
    if (pesananData.provinceCode) {
      const regenciesForProvince =
        dummyRegencies[pesananData.provinceCode] || [];
      setRegencies(regenciesForProvince);
    } else {
      setRegencies([]);
    }
  }, [pesananData.provinceCode]);

  // Load districts when regency changes
  useEffect(() => {
    if (pesananData.regencyCode) {
      const districtsForRegency = dummyDistricts[pesananData.regencyCode] || [];
      setDistricts(districtsForRegency);
    } else {
      setDistricts([]);
    }
  }, [pesananData.regencyCode]);

  // Load villages when district changes
  useEffect(() => {
    if (pesananData.districtCode) {
      const villagesForDistrict = dummyVillages[pesananData.districtCode] || [];
      setVillages(villagesForDistrict);
    } else {
      setVillages([]);
    }
  }, [pesananData.districtCode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownStates({
          province: false,
          regency: false,
          district: false,
          village: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const handleSearch = (field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (field) => {
    setDropdownStates((prev) => {
      // Close all other dropdowns
      const newStates = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      // Toggle the clicked dropdown
      newStates[field] = !prev[field];
      return newStates;
    });
  };

  const handleClickOutside = (field) => {
    setDropdownStates((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const getFilteredOptions = (items, field, searchTerm) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleLocationSelect = (field, value, codeField, code) => {
    handlePesananChange(nomor, field, value);
    handlePesananChange(nomor, codeField, code);
    setSearchTerms((prev) => ({ ...prev, [field]: "" }));
    handleClickOutside(field);

    // Clear dependent fields
    if (field === "provinsi") {
      handlePesananChange(nomor, "kota", "");
      handlePesananChange(nomor, "regencyCode", "");
      handlePesananChange(nomor, "kecamatan", "");
      handlePesananChange(nomor, "districtCode", "");
      handlePesananChange(nomor, "kelurahan", "");
      handlePesananChange(nomor, "villageCode", "");
      handlePesananChange(nomor, "kodePos", "");
    } else if (field === "kota") {
      handlePesananChange(nomor, "kecamatan", "");
      handlePesananChange(nomor, "districtCode", "");
      handlePesananChange(nomor, "kelurahan", "");
      handlePesananChange(nomor, "villageCode", "");
      handlePesananChange(nomor, "kodePos", "");
    } else if (field === "kecamatan") {
      handlePesananChange(nomor, "kelurahan", "");
      handlePesananChange(nomor, "villageCode", "");
      handlePesananChange(nomor, "kodePos", "");
    }
  };

  return (
    <div className="border-2 rounded-xl p-4 mb-4 bg-white">
      <h2 className="text-2xl text-green-700 mb-4">Pesanan #{nomor}</h2>
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`jumlahItem-${nomor}`}
        >
          Jumlah Item
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="number"
          id={`jumlahItem-${nomor}`}
          name={`jumlahItem-${nomor}`}
          value={pesananData.jumlahItem}
          onChange={(e) =>
            handlePesananChange(nomor, "jumlahItem", e.target.value)
          }
          placeholder="Masukan jumlah item"
          required
        />
      </div>

      {/* Province Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`provinsi-${nomor}`}
        >
          Provinsi
        </label>
        <div className="relative dropdown-container">
          <input
            type="text"
            className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] cursor-pointer"
            placeholder="Cari provinsi..."
            value={pesananData.provinsi || searchTerms.province}
            onChange={(e) => handleSearch("province", e.target.value)}
            onClick={() => toggleDropdown("province")}
          />
          {dropdownStates.province && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl max-h-60 overflow-y-auto shadow-lg">
              {getFilteredOptions(
                provinces,
                "province",
                searchTerms.province
              ).map((province) => (
                <div
                  key={province.code}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleLocationSelect(
                      "provinsi",
                      province.name,
                      "provinceCode",
                      province.code
                    )
                  }
                >
                  {province.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {pesananData.provinsi && (
          <p className="text-green-700 mt-1">
            Selected: {pesananData.provinsi}
          </p>
        )}
      </div>

      {/* Regency/City Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`kota-${nomor}`}
        >
          Kabupaten/Kota
        </label>
        <div className="relative dropdown-container">
          <input
            type="text"
            className={`w-full max-w-full border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
              !pesananData.provinceCode
                ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400"
                : "bg-white border-[#C9CDC2] cursor-pointer"
            }`}
            placeholder="Cari kabupaten/kota..."
            value={pesananData.kota || searchTerms.regency}
            onChange={(e) => handleSearch("regency", e.target.value)}
            onClick={() =>
              pesananData.provinceCode && toggleDropdown("regency")
            }
            disabled={!pesananData.provinceCode}
          />
          {dropdownStates.regency && pesananData.provinceCode && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl max-h-60 overflow-y-auto shadow-lg">
              {getFilteredOptions(
                regencies,
                "regency",
                searchTerms.regency
              ).map((regency) => (
                <div
                  key={regency.code}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleLocationSelect(
                      "kota",
                      regency.name,
                      "regencyCode",
                      regency.code
                    )
                  }
                >
                  {regency.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {pesananData.kota && (
          <p className="text-green-700 mt-1">Selected: {pesananData.kota}</p>
        )}
      </div>

      {/* District Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`kecamatan-${nomor}`}
        >
          Kecamatan
        </label>
        <div className="relative dropdown-container">
          <input
            type="text"
            className={`w-full max-w-full border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
              !pesananData.regencyCode
                ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400"
                : "bg-white border-[#C9CDC2] cursor-pointer"
            }`}
            placeholder="Cari kecamatan..."
            value={pesananData.kecamatan || searchTerms.district}
            onChange={(e) => handleSearch("district", e.target.value)}
            onClick={() =>
              pesananData.regencyCode && toggleDropdown("district")
            }
            disabled={!pesananData.regencyCode}
          />
          {dropdownStates.district && pesananData.regencyCode && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl max-h-60 overflow-y-auto shadow-lg">
              {getFilteredOptions(
                districts,
                "district",
                searchTerms.district
              ).map((district) => (
                <div
                  key={district.code}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleLocationSelect(
                      "kecamatan",
                      district.name,
                      "districtCode",
                      district.code
                    )
                  }
                >
                  {district.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {pesananData.kecamatan && (
          <p className="text-green-700 mt-1">
            Selected: {pesananData.kecamatan}
          </p>
        )}
      </div>

      {/* Village Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`kelurahan-${nomor}`}
        >
          Kelurahan
        </label>
        <div className="relative dropdown-container">
          <input
            type="text"
            className={`w-full max-w-full border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
              !pesananData.districtCode
                ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400"
                : "bg-white border-[#C9CDC2] cursor-pointer"
            }`}
            placeholder="Cari kelurahan..."
            value={pesananData.kelurahan || searchTerms.village}
            onChange={(e) => handleSearch("village", e.target.value)}
            onClick={() =>
              pesananData.districtCode && toggleDropdown("village")
            }
            disabled={!pesananData.districtCode}
          />
          {dropdownStates.village && pesananData.districtCode && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl max-h-60 overflow-y-auto shadow-lg">
              {getFilteredOptions(villages, "village", searchTerms.village).map(
                (village) => (
                  <div
                    key={village.code}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleLocationSelect(
                        "kelurahan",
                        village.name,
                        "villageCode",
                        village.code
                      );
                      handlePesananChange(
                        nomor,
                        "kodePos",
                        village.postal_code
                      );
                    }}
                  >
                    {village.name}
                  </div>
                )
              )}
            </div>
          )}
        </div>
        {pesananData.kelurahan && (
          <p className="text-green-700 mt-1">
            Selected: {pesananData.kelurahan}
          </p>
        )}
      </div>

      {/* Postal Code */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`kodePos-${nomor}`}
        >
          Kode Pos
        </label>
        <input
          className="w-full max-w-full bg-gray-50 border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`kodePos-${nomor}`}
          name={`kodePos-${nomor}`}
          value={pesananData.kodePos}
          readOnly
          placeholder="Kode pos akan terisi otomatis"
        />
      </div>

      {/* Detailed Address */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`alamat-${nomor}`}
        >
          Alamat Lengkap
        </label>
        <textarea
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          id={`alamat-${nomor}`}
          name={`alamat-${nomor}`}
          value={pesananData.alamat}
          onChange={(e) => handlePesananChange(nomor, "alamat", e.target.value)}
          placeholder="Masukan alamat lengkap (nama jalan, nomor rumah, RT/RW, patokan)"
          required
          rows={3}
        />
      </div>

      {/* THR Section */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700">
          Tambah THR
        </label>
        <div className="flex gap-2">
          {[5000, 10000, 20000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleTHRChange(nomor, amount)}
              className={`px-4 py-2 rounded-full ${
                selectedTHR[nomor] === amount ? "bg-[#C9CDC2]" : "bg-gray-200"
              }`}
            >
              Rp. {amount.toLocaleString()}
            </button>
          ))}
        </div>
        {selectedTHR[nomor] && (
          <p className="text-green-700 mt-2">
            THR yang dipilih: Rp. {selectedTHR[nomor].toLocaleString()}
          </p>
        )}
      </div>

      {/* Delete Button */}
      {nomor > 1 && (
        <button
          type="button"
          onClick={() => handleRemove(nomor)}
          className="bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              fill="currentColor"
            />
          </svg>
          Hapus Pesanan
        </button>
      )}
    </div>
  );
}
