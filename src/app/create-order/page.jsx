"use client";

import { useState } from "react";
import CustomerDetails from "@/components/OrderForm/CustomerDetails";
import AccessoryDetails from "@/components/OrderForm/AccessoryDetails";
import Pesanan from "@/components/OrderForm/Pesanan";
import { dummyProvinces } from "@/data/locationData";

export default function OrderPage() {
  const [pesananList, setPesananList] = useState([1]);
  const [selectedTHR, setSelectedTHR] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
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
      signatureImage,
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

  const handleSaveSignature = (dataUrl) => {
    setSignatureImage(dataUrl);
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

        <div className="w-full md:mt-[8svh] mt-[4svh]">
          <form onSubmit={handleSubmit}>
            <CustomerDetails
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <AccessoryDetails
              formData={formData}
              handleInputChange={handleInputChange}
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              onSaveSignature={handleSaveSignature}
              signatureImage={signatureImage}
            />

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
              <Link href="/summary">
                <button className="bg-[#92ED00] px-[4svh] py-[2svh] rounded-full font-medium text-[2.8svh] text-[#046511]">
                  Selanjutnya
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
