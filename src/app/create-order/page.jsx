"use client";

import { useState, useEffect } from "react";
import CustomerDetails from "@/components/OrderForm/CustomerDetails";
import AccessoryDetails from "@/components/OrderForm/AccessoryDetails";
import Pesanan from "@/components/OrderForm/Pesanan";
import { dummyProvinces } from "@/data/locationData";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { createOrder } from "@/actions/orderActions";
import { toast } from "react-hot-toast";
import { getDeliveryQuotation } from "@/utils/lalamoveApi";

export default function OrderPage() {
  const router = useRouter();
  const { orderData, updateCustomerInfo, updatePesanan, updateSelectedTHR, updateFile, updateSignature, updateDeliveryQuotations } = useOrder();

  const [pesananList, setPesananList] = useState([1]);
  const [selectedTHR, setSelectedTHR] = useState(orderData.selectedTHR || {});
  const [selectedFile, setSelectedFile] = useState(orderData.selectedFile || null);
  const [signatureImage, setSignatureImage] = useState(orderData.signatureImage || null);
  const [provinces] = useState(dummyProvinces);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryQuotations, setDeliveryQuotations] = useState({});

  const [formData, setFormData] = useState({
    name: orderData.customerInfo?.name || "",
    email: orderData.customerInfo?.email || "",
    whatsapp: orderData.customerInfo?.whatsapp || "",
    memo: orderData.customerInfo?.memo || "",
    message: orderData.customerInfo?.message || "",
    pesanan:
      orderData.pesanan?.length > 0
        ? orderData.pesanan
        : [
            {
              nomor: 1,
              jumlahItem: "",
              namaPenerima: "",
              whatsappPenerima: "",
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

  // Sync pesananList dengan formData.pesanan
  useEffect(() => {
    if (formData.pesanan && formData.pesanan.length > 0) {
      const nomorList = formData.pesanan.map((p) => p.nomor);
      setPesananList(nomorList);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDeliveryCost = async (pesanan) => {
    try {
      // Format stops untuk API Lalamove
      const stops = [
        {
          // Koordinat pickup (gudang/toko)
          coordinates: {
            lat: parseFloat(process.env.NEXT_PUBLIC_STORE_LAT),
            lng: parseFloat(process.env.NEXT_PUBLIC_STORE_LNG),
          },
          address: process.env.NEXT_PUBLIC_STORE_ADDRESS,
        },
        {
          // Koordinat delivery (alamat penerima)
          coordinates: {
            lat: parseFloat(pesanan.latitude),
            lng: parseFloat(pesanan.longitude),
          },
          address: `${pesanan.alamat}, ${pesanan.kelurahan}, ${pesanan.kecamatan}, ${pesanan.kota}, ${pesanan.provinsi} ${pesanan.kodePos}`,
        },
      ];

      const quotation = await getDeliveryQuotation(stops);

      // Cek apakah respon sesuai format yang diharapkan
      if (quotation && quotation.data && quotation.data.priceBreakdown) {
        return quotation.data.priceBreakdown.total;
      } else {
        console.error("Unexpected quotation format:", quotation);
        return null;
      }
    } catch (error) {
      console.error("Error getting delivery cost:", error);
      return null;
    }
  };

  const handlePesananChange = async (nomor, field, value) => {
    setFormData((prev) => {
      const updatedPesanan = prev.pesanan.map((item) => (item.nomor === nomor ? { ...item, [field]: value } : item));

      // Jika semua data alamat sudah terisi, dapatkan biaya pengiriman
      const currentPesanan = updatedPesanan.find((p) => p.nomor === nomor);
      console.log(currentPesanan);
      if (currentPesanan && currentPesanan.latitude && currentPesanan.longitude && currentPesanan.alamat && currentPesanan.kelurahan && currentPesanan.kecamatan && currentPesanan.kota && currentPesanan.provinsi && currentPesanan.kodePos) {
        getDeliveryCost(currentPesanan).then((cost) => {
          if (cost) {
            setDeliveryQuotations((prev) => {
              const updatedQuotations = {
                ...prev,
                [nomor]: cost,
              };
              // Update context
              updateDeliveryQuotations(updatedQuotations);
              return updatedQuotations;
            });
          }
        });
      }

      return {
        ...prev,
        pesanan: updatedPesanan,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update context data
      const customerInfo = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        memo: formData.memo,
        message: formData.message,
      };

      updateCustomerInfo(customerInfo);
      updatePesanan(formData.pesanan);
      updateSelectedTHR(selectedTHR);
      updateFile(selectedFile);
      updateSignature(signatureImage);
      updateDeliveryQuotations(deliveryQuotations);

      // Kirim data ke Supabase
      const result = await createOrder({
        customerInfo,
        pesanan: formData.pesanan,
        selectedFile,
        signatureImage,
        selectedTHR,
        deliveryQuotations,
      });

      if (result.success) {
        toast.success("Pesanan berhasil dibuat!");
        // Redirect ke halaman summary
        router.push("/summary");
      } else {
        toast.error(`Gagal membuat pesanan: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saat memproses pesanan:", error);
      toast.error(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
          namaPenerima: "",
          whatsappPenerima: "",
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
            <span>Pesan</span> <span>sekarang,</span> <span>jangan</span> <span>cuma</span>{" "}
            <span className="relative ml-[1.4svh] md:ml-[2svh]">
              <img src="/assets/icons/wacana-word.svg" className="md:h-[6svh] h-[3.6svh]" alt="icon" />
            </span>
          </h1>
        </div>

        <div className="w-full md:mt-[8svh] mt-[4svh]">
          <form onSubmit={handleSubmit}>
            <CustomerDetails formData={formData} handleInputChange={handleInputChange} />
            <AccessoryDetails formData={formData} handleInputChange={handleInputChange} selectedFile={selectedFile} handleFileChange={handleFileChange} onSaveSignature={handleSaveSignature} signatureImage={signatureImage} />

            <h2 className="text-2xl text-green-700 mb-4">Detail Pesanan</h2>
            {pesananList.map((nomor) => (
              <Pesanan key={nomor} nomor={nomor} formData={formData} handlePesananChange={handlePesananChange} handleRemove={removePesanan} handleTHRChange={handleTHRChange} selectedTHR={selectedTHR} provinces={provinces} />
            ))}

            <div onClick={addPesanan} className="border-2 border-dashed border-[#C9CDC2] flex gap-1 items-center justify-center px-4 py-4 rounded-lg text-center cursor-pointer mb-8">
              <span className="text-[#C9CDC2]">Tambah pesanan lain </span>
              <svg className="3svh" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.49992 1.33203C4.81992 1.33203 1.83325 4.3187 1.83325 7.9987C1.83325 11.6787 4.81992 14.6654 8.49992 14.6654C12.1799 14.6654 15.1666 11.6787 15.1666 7.9987C15.1666 4.3187 12.1799 1.33203 8.49992 1.33203ZM11.8333 8.66536H9.16658V11.332H7.83325V8.66536H5.16658V7.33203H7.83325V4.66536H9.16658V7.33203H11.8333V8.66536Z"
                  fill="#C9CDC2"
                />
              </svg>
            </div>

            <div className="flex justify-center items-center mt-8">
              <button type="submit" className="bg-[#92ED00] px-[4svh] py-[2svh] rounded-full font-medium text-[2.8svh] text-[#046511] disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Selanjutnya"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
