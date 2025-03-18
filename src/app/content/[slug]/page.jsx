"use client";

import SignatureInput from "@/components/SignatureInput";
import RecordVideoModal from "@/components/RecordVideoModal";
import Message from "@/components/Message";
import { useState, useRef, useEffect } from "react";
import { saveContent, validateOrderId } from "@/actions/contentActions";
import { useParams, useRouter } from "next/navigation";

export default function OrderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [isOrderValid, setIsOrderValid] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [agreeToDisplay, setAgreeToDisplay] = useState(false);

  const fileInputRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const orderId = params.slug;

  // Validasi order_id saat komponen dimuat
  useEffect(() => {
    async function checkOrderValidity() {
      setIsValidating(true);
      try {
        const isValid = await validateOrderId(orderId);
        setIsOrderValid(isValid);
        if (!isValid) {
          // Redirect ke halaman error jika order tidak valid
          alert("Order ID tidak valid");
          router.push("/");
        }
      } catch (error) {
        console.error("Error validasi order:", error);
        alert("Terjadi kesalahan saat validasi order");
        router.push("/");
      } finally {
        setIsValidating(false);
      }
    }

    checkOrderValidity();
  }, [orderId, router]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPreview = () => {
    if (!recordedVideo) {
      alert("Mohon rekam atau upload video terlebih dahulu");
      return;
    }
    if (!name.trim()) {
      alert("Mohon isi nama terlebih dahulu");
      return;
    }
    if (!message.trim()) {
      alert("Mohon isi pesan terlebih dahulu");
      return;
    }
    if (!signature) {
      alert("Mohon isi tanda tangan terlebih dahulu");
      return;
    }
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleSaveVideo = (videoUrl, videoBlob) => {
    setRecordedVideo(videoUrl);

    // Konversi blob ke File
    const file = new File([videoBlob], `video_${Date.now()}.webm`, { type: "video/webm" });
    setVideoFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith("video/")) {
        alert("Mohon upload file video");
        return;
      }

      // Validasi ukuran file (maksimal 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert("Ukuran video maksimal 100MB");
        return;
      }

      const url = URL.createObjectURL(file);
      setRecordedVideo(url);
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recordedVideo || !name.trim() || !message.trim() || !signature || !agreeToDisplay) {
      alert("Mohon lengkapi semua data dan centang persetujuan");
      return;
    }

    setIsLoading(true);

    try {
      // Buat FormData untuk dikirim ke server action
      const formData = new FormData();
      formData.append("nama", name);
      formData.append("pesan", message);
      formData.append("signature", signature);
      formData.append("video", videoFile);

      // Panggil server action untuk menyimpan data
      const result = await saveContent(formData, orderId);

      if (result.success) {
        alert("Data berhasil disimpan!");
        // Redirect ke halaman sukses
        router.push(`/content/success/${orderId}`);
      } else {
        alert(`Gagal menyimpan data: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilkan loading selama validasi
  if (isValidating) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-xl text-center text-green-700">Memvalidasi order...</p>
        </div>
      </div>
    );
  }

  // Tampilkan halaman utama jika order valid
  return (
    <div className="min-h-screen bg-[#EDF0E7]">
      <div className="md:px-40 sm:px-8 px-4 py-24">
        <div className="w-full relative flex justify-center items-center">
          <h1 className="text-5xl md:text-5xl font-medium text-green-700">Record video & buat pesan mu!</h1>
        </div>

        <div className="w-full mt-24 px-4 sm:px-8 md:px-56">
          <form onSubmit={handleSubmit}>
            <div className="border-2 rounded-xl p-4 mb-4 bg-white">
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700">Video Pesan</label>
                {recordedVideo ? (
                  <div className="flex flex-col gap-4">
                    <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                      <video src={recordedVideo} controls className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-center">
                      <button type="button" onClick={handleOpenModal} className="bg-gray-200 px-6 py-3 rounded-full font-medium text-xl text-gray-700">
                        Rekam Ulang
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={handleOpenModal} className="w-full bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <span className="text-2xl">📹</span>
                        <span className="text-xl text-green-700">Rekam Video</span>
                      </button>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <span className="text-2xl">📁</span>
                        <span className="text-xl text-green-700">Upload Video</span>
                      </button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700" htmlFor="nama">
                  Nama
                </label>
                <input type="text" id="nama" name="nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" placeholder="Masukan nama kamu" required />
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700" htmlFor="pesan">
                  Pesan
                </label>
                <textarea className="w-full h-80 bg-white border-2 border-[#C9CDC2] rounded-xl p-4 text-xl" id="pesan" name="pesan" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Masukan pesan kamu" required />
              </div>
              <SignatureInput onSave={setSignature} />
              <div className="flex flex-col gap-4">
                <div className="flex justify-start items-center gap-2">
                  <input type="checkbox" id="checkbox" checked={agreeToDisplay} onChange={(e) => setAgreeToDisplay(e.target.checked)} className="w-4 h-4 bg-transparent peer-checked:bg-transparent" required />
                  <label className="text-xl text-[#383C33]">Setuju kalau video kamu tayang di web</label>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleOpenPreview}
                    className="flex items-center gap-2 bg-transparent border-2 border-gray-500 px-6 py-3 rounded-full font-medium text-xl text-green-700 hover:bg-green-700 hover:text-white transition-colors group"
                  >
                    Preview
                    <img src="/assets/icons/eye-icon.svg" alt="preview" className="w-6 h-6 transition-all group-hover:brightness-0 group-hover:invert" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button type="submit" disabled={isLoading} className={`bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <RecordVideoModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveVideo} />

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button onClick={handleClosePreview} className="absolute -right-4 -top-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative flex flex-col sm:flex-row justify-center">
              <div className="relative z-10 transform -rotate-6">
                <div className="bg-white w-full sm:w-[360px] h-[434px] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3">
                  <div className="w-full h-full overflow-hidden">
                    <video src={recordedVideo} alt="polaroid" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex justify-between items-center w-full h-auto">
                    <p className="text-lg sm:text-xl font-otherHand text-green-700">{name}</p>

                    <img src="/assets/icons/green-maaf-sign.svg" alt="icon" className="w-6 h-6 sm:w-auto sm:h-auto" />
                  </div>
                </div>
              </div>
              <div className="relative z-10 transform rotate-6 -mt-8 sm:-mt-12">
                <Message message={message} signature={signature} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
