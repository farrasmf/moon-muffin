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

export default function OrderPage() {
  const router = useRouter();
  const {
    orderData,
    updateCustomerInfo,
    updatePesanan,
    updateSelectedTHR,
    updateFile,
    updateSignature,
  } = useOrder();

  const [pesananList, setPesananList] = useState([]);
  const [selectedTHR, setSelectedTHR] = useState(orderData.selectedTHR || {});
  const [selectedFile, setSelectedFile] = useState(
    orderData.selectedFile || null
  );
  const [signatureImage, setSignatureImage] = useState(
    orderData.signatureImage || null
  );
  const [provinces] = useState(dummyProvinces);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: orderData.customerInfo?.name || "",
    email: orderData.customerInfo?.email || "",
    whatsapp: orderData.customerInfo?.whatsapp || "",
    memo: orderData.customerInfo?.memo || "",
    message: orderData.customerInfo?.message || "",
    pesanan: [],
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
    // Clear the corresponding error when input is modified
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handlePesananChange = (nomor, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pesanan:
        prev.pesanan.map((item) =>
          item.nomor === nomor ? { ...item, [field]: value } : item
        ) || [],
    }));
    // Clear the pesanan error when any input is added
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.pesanan;

      // Clear specific location field errors
      if (prev[`pesanan_${nomor}`]) {
        const orderErrors = { ...prev[`pesanan_${nomor}`] };
        delete orderErrors[field];
        if (Object.keys(orderErrors).length === 0) {
          delete newErrors[`pesanan_${nomor}`];
        } else {
          newErrors[`pesanan_${nomor}`] = orderErrors;
        }
      }

      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let hasError = false;

    // Validate customer details
    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
      hasError = true;
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp harus diisi";
      hasError = true;
    }

    // Validate orders
    if (pesananList.length === 0) {
      newErrors.pesanan = "Minimal harus ada 1 pesanan";
      hasError = true;
    }

    // Validate each order
    pesananList.forEach((nomor) => {
      const pesanan = formData.pesanan.find((p) => p.nomor === nomor);
      const orderErrors = {};

      if (!pesanan.jumlahItem || parseInt(pesanan.jumlahItem) <= 0) {
        orderErrors.jumlahItem = "Jumlah item harus diisi";
      }
      if (!pesanan.namaPenerima?.trim()) {
        orderErrors.namaPenerima = "Nama penerima harus diisi";
      }
      if (!pesanan.whatsappPenerima?.trim()) {
        orderErrors.whatsappPenerima = "Nomor WhatsApp penerima harus diisi";
      }
      if (!pesanan.alamat?.trim()) {
        orderErrors.alamat = "Alamat harus diisi";
      }
      if (!pesanan.provinsi?.trim()) {
        orderErrors.provinsi = "Provinsi harus diisi";
      }
      if (!pesanan.kota?.trim()) {
        orderErrors.kota = "Kota harus diisi";
      }
      if (!pesanan.kecamatan?.trim()) {
        orderErrors.kecamatan = "Kecamatan harus diisi";
      }
      if (!pesanan.kelurahan?.trim()) {
        orderErrors.kelurahan = "Kelurahan harus diisi";
      }
      if (!pesanan.kodePos?.trim()) {
        orderErrors.kodePos = "Kode pos harus diisi";
      }

      if (Object.keys(orderErrors).length > 0) {
        newErrors[`pesanan_${nomor}`] = orderErrors;
        hasError = true;
      }
    });

    // Validate accessories
    if (!selectedFile) {
      newErrors.file = "File harus diupload";
      hasError = true;
    }
    if (!formData.namaPolaroid?.trim()) {
      newErrors.namaPolaroid = "Nama di polaroid harus diisi";
      hasError = true;
    }
    if (!formData.pesan?.trim()) {
      newErrors.pesan = "Pesan harus diisi";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsFormSubmitted(true);

    try {
      if (!validateForm()) {
        toast("Lengkapi dulu detailnya yaa!");
        setIsSubmitting(false);
        return;
      }

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

      // Kirim data ke Supabase
      const result = await createOrder({
        customerInfo,
        pesanan: formData.pesanan,
        selectedFile,
        signatureImage,
        selectedTHR,
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
    // Clear the pesanan error when adding a new order
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.pesanan;
      return newErrors;
    });
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
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-8">
        <div className="flex-1">
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
                errors={errors}
              />
              <AccessoryDetails
                formData={formData}
                handleInputChange={handleInputChange}
                selectedFile={selectedFile}
                handleFileChange={handleFileChange}
                onSaveSignature={handleSaveSignature}
                signatureImage={signatureImage}
                errors={errors}
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
                  errors={errors[`pesanan_${nomor}`]}
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
              {isFormSubmitted && errors.pesanan && (
                <p className="text-red-500 text-center mb-8">
                  {errors.pesanan}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="w-full md:w-[400px] order-last md:order-last">
          <div className="md:sticky md:top-[15svh]">
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-[2svh]">
              <h2 className="text-2xl text-green-700 mb-6">Ringkasan Harga</h2>
              {pesananList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <svg
                    width="98"
                    height="82"
                    viewBox="0 0 98 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.51758 18.8296C7.29703 34.8408 13.3093 50.4837 18.2576 66.4282C18.478 67.1382 17.9922 66.2832 18.9009 66.1822C21.5082 65.8925 24.1507 65.7111 26.7709 65.5579C32.3147 65.2339 37.8542 64.7279 43.4001 64.4607C48.5643 64.2118 53.7279 63.4391 58.8942 63.4391C62.7662 63.4391 66.6381 63.4391 70.5101 63.4391C72.9692 63.4391 75.1828 63.909 77.5855 64.1012C80.3209 64.3201 79.1368 64.0647 79.1368 61.9067C79.1368 59.2497 79.4989 56.6099 79.4774 53.9421C79.4437 49.7619 78.1813 45.8799 77.8504 41.7587C77.1914 33.5515 76.4882 23.8811 78.1153 15.746C78.3424 14.6103 78.428 12.1372 78.9666 11.1677C80.4115 8.56687 74.5561 9.63533 73.537 9.63533C66.4055 9.63533 59.3077 10.1665 52.1971 10.6569C45.4388 11.123 38.7933 10.7654 32.068 10.6569C25.9005 10.5574 19.8162 11.7403 13.8686 13.4001C10.4822 14.3451 0.363935 16.7865 3.8797 16.7865"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M79.1367 14.4016C80.1347 11.1938 80.6221 7.53372 82.1258 4.52625C82.2841 4.20959 82.5613 4.01511 82.8069 3.76952C83.7223 2.85413 86.6984 2.84388 87.9148 2.8236C90.4636 2.78112 93.07 3.16413 95.4822 3.16413"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M65.1751 70.2486C62.6768 70.8164 59.2247 74.2244 60.2941 77.0213C60.7903 78.3191 61.9454 79.2629 63.3967 79.0267C64.5696 78.8357 65.8223 78.4297 66.802 77.7402C67.7603 77.0659 67.4283 75.9596 67.729 74.9971C68.4979 72.5368 67.6196 70.3553 65.6669 68.8675C64.6794 68.1151 61.8023 66.0647 61.0887 68.2054"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M32.8249 69.5675C30.0859 70.436 27.3765 71.6945 27.3765 75.016C27.3765 76.1691 27.8628 77.2601 28.7575 78.0429C30.3982 79.4785 34.5995 79.6256 36.2302 78.0807C37.968 76.4344 37.9295 73.1093 36.8924 71.0999C36.2298 69.8161 35.5964 68.2497 34.3573 67.3919C33.5197 66.812 31.7951 67.1838 30.7818 67.1838"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M24.3115 20.1914C24.9145 27.9241 25.6028 35.5942 26.8655 43.2529C27.9035 49.5487 29.0747 55.8277 30.3654 62.0766C30.4277 62.3785 30.7463 66.8676 31.8032 66.163"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M58.0239 17.8066C58.8962 34.0985 60.4396 50.4131 62.4508 66.5024"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12.3931 32.1093C30.6599 30.1588 48.8883 27.8632 67.2562 27.1905C70.1316 27.0852 74.5169 26.9117 77.6424 26.8878C79.9471 26.8703 78.8632 26.8656 78.4559 27.0014"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M27.0356 47.7736C33.5069 47.6537 40.0133 47.6508 46.4648 47.0925C55.8161 46.2833 64.9564 44.0773 74.2558 43.044C75.253 42.9332 76.2215 42.4247 77.0936 43.0062"
                      stroke="#C9CDC2"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-[#C9CDC2] text-center mt-4">
                    Pesananmu kosong…
                    <br />
                    muffin aja ada isinya.
                  </p>
                </div>
              ) : (
                <div className="h-fit max-h-[calc(100vh-50svh)]  overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-white hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                  {pesananList.map((nomor) => {
                    const pesanan = formData.pesanan.find(
                      (p) => p.nomor === nomor
                    );
                    const jumlahItem = parseInt(pesanan?.jumlahItem) || 0;
                    const hargaPerItem = 169000;
                    const biayaPengiriman = 10000;
                    const thr = parseInt(selectedTHR[nomor]) || 0;
                    const subtotal =
                      jumlahItem * hargaPerItem + thr + biayaPengiriman;

                    return (
                      <div key={nomor} className="mb-6">
                        <h3 className="text-lg text-green-700 mb-3">
                          Pesanan {nomor}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>MoonMuffin Hampers x {jumlahItem} pcs</span>
                            <span>
                              Rp. {(jumlahItem * hargaPerItem).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>THR (Opsional)</span>
                            <span>Rp. {thr.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Biaya Pengiriman</span>
                            <span>Rp. {biayaPengiriman.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Subtotal</span>
                            <span>Rp. {subtotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-6"></div>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>Total</span>
                <span>
                  Rp.{" "}
                  {pesananList
                    .reduce((total, nomor) => {
                      const pesanan = formData.pesanan.find(
                        (p) => p.nomor === nomor
                      );
                      const jumlahItem = parseInt(pesanan?.jumlahItem) || 0;
                      const hargaPerItem = 169000;
                      const biayaPengiriman = 10000;
                      const thr = parseInt(selectedTHR[nomor]) || 0;
                      return (
                        total +
                        jumlahItem * hargaPerItem +
                        thr +
                        biayaPengiriman
                      );
                    }, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#92ED00] px-[4svh] py-[2svh] rounded-full font-medium text-[2.8svh] text-[#046511] disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
