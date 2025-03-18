"use client";

import SignatureInput from "@/components/SignatureInput";
import RecordVideoModal from "@/components/RecordVideoModal";
import Message from "@/components/Message";
import { useState, useRef, useEffect } from "react";
import { saveContent, validateOrderId } from "@/actions/contentActions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { messageTemplates } from "@/constants/messageTemplates";

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
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [contentNames, setContentNames] = useState([]);

  const fileInputRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const orderId = params.slug;

  // Fetch content names when component mounts
  useEffect(() => {
    async function fetchContentNames() {
      try {
        const response = await fetch(`/api/gallery?orderId=${orderId}`);
        const result = await response.json();
        if (result.data) {
          setContentNames(result.data);
        }
      } catch (error) {
        console.error("Error fetching content names:", error);
      }
    }

    if (isOrderValid) {
      fetchContentNames();
    }
  }, [orderId, isOrderValid]);

  // Validasi order_id saat komponen dimuat
  useEffect(() => {
    async function checkOrderValidity() {
      setIsValidating(true);
      try {
        const isValid = await validateOrderId(orderId);
        setIsOrderValid(isValid);
        if (!isValid) {
          setIsValidating(false);
          return;
        }
      } catch (error) {
        console.error("Error validasi order:", error);
        setIsOrderValid(false);
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
    const newErrors = {};

    if (!recordedVideo) {
      newErrors.video = "Upload atau rekam video dulu yaa!";
      toast("Upload atau rekam video dulu yaa!");
    }
    if (!name.trim()) {
      newErrors.name = "Namanya tolong diisi yaa!";
    }
    if (!message.trim()) {
      newErrors.message = "Pesannya tolong diisi yaa!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleSaveVideo = (videoUrl, videoBlob) => {
    setRecordedVideo(videoUrl);

    // Konversi blob ke File
    const file = new File([videoBlob], `video_${Date.now()}.mp4`, {
      type: "video/mp4",
    });
    setVideoFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith("video/")) {
        toast("Upload file video dulu yaa!");
        return;
      }

      // Validasi ukuran file (maksimal 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast("Ukuran video maksimal 100MB yaa!");
        return;
      }

      const url = URL.createObjectURL(file);
      setRecordedVideo(url);
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!recordedVideo) {
      newErrors.video = "Upload atau rekam video dulu yaa!";
    }
    if (!name.trim()) {
      newErrors.name = "Namanya tolong diisi yaa!";
    }
    if (!message.trim()) {
      newErrors.message = "Pesannya tolong diisi yaa!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", name);
      formData.append("pesan", message);
      if (signature) {
        formData.append("signature", signature);
      }
      formData.append("video", videoFile);
      formData.append("consent", agreeToDisplay ? "1" : "0");

      const loadingToast = toast.loading(
        "Mengupload video dan menyimpan data..."
      );

      const result = await saveContent(formData, orderId);

      if (result.success) {
        toast.success("Data berhasil disimpan!", { id: loadingToast });
        setIsSuccess(true);
        // Refresh content names after successful submission
        const response = await fetch(`/api/gallery?orderId=${orderId}`);
        const data = await response.json();
        if (data.data) {
          setContentNames(data.data);
        }
      } else {
        toast.error(`Gagal menyimpan data: ${result.error}`, {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecordedVideo(null);
    setVideoFile(null);
    setName("");
    setMessage("");
    setSignature(null);
    setAgreeToDisplay(false);
    setErrors({});
    setIsSuccess(false);
  };

  // Tampilkan loading selama validasi
  if (isValidating) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <p className="text-[3.6svh] text-center text-green-700">
          Kita cek kode pesanan kamu dulu yaa!
        </p>
      </div>
    );
  }

  // Tampilkan halaman error jika order tidak valid
  if (!isOrderValid) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex flex-col items-center justify-center gap-4">
        <p className="text-[3.6svh] text-center text-green-700 mt-10">
          Pesanan kamu tidak ditemukan :(
        </p>
        <button
          onClick={() => router.push("/content")}
          className="bg-[#046511] px-6 py-4 rounded-full font-medium text-[2.4svh] text-white hover:opacity-90 transition-opacity"
        >
          Masukkan Kode Lagi
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-transparent border-2 border-green-700 px-6 py-4 rounded-full font-medium text-[2.4svh] text-green-700 hover:bg-green-700 hover:text-white transition-colors"
        >
          Ke Halaman Utama
        </button>
      </div>
    );
  }

  // Tampilkan success state jika berhasil
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex flex-col items-center justify-center gap-4 px-[8svw]">
        <div className="text-center">
          <h1 className="text-[3.6svh] text-green-700 mb-4">
            Pesan kamu berhasil disimpan! 🎉
          </h1>
          <p className="text-[2.4svh] text-[#383C33] mb-8">
            Terima kasih sudah berbagi pesan kamu
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleReset}
              className="bg-[#046511] px-6 py-4 rounded-full font-medium text-[2.4svh] text-white hover:opacity-90 transition-opacity"
            >
              Tambah Pesan Lagi
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-transparent border-2 border-green-700 px-6 py-4 rounded-full font-medium text-[2.4svh] text-green-700 hover:bg-green-700 hover:text-white transition-colors"
            >
              Ke Halaman Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan halaman utama jika order valid
  return (
    <div className="min-h-screen bg-[#EDF0E7] pt-[20svh] pb-[10svh]">
      <div>
        <div className="w-full relative flex justify-center items-center px-[8svw] text-center">
          <h1 className="text-[3.5svh] md:text-[5.5svh] font-medium text-green-700">
            Record video & buat pesan mu!
          </h1>
        </div>

        {contentNames.length > 0 && (
          <div className="w-full mt-4 px-4 sm:px-8 md:px-56">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-xl text-green-700 mb-3">Yang udah upload:</h2>
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {contentNames.map((content, index) => (
                  <span
                    key={index}
                    className="font-['OtherHand'] text-green-700 text-[5svh]"
                  >
                    {content.name}
                    {index !== contentNames.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="w-full mt-[5svh] px-4 sm:px-8 md:px-56">
          <form onSubmit={handleSubmit} noValidate>
            <div className="border-2 rounded-xl p-4 mb-4 bg-white">
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700">Video Pesan</label>
                {recordedVideo ? (
                  <div className="flex flex-col gap-4">
                    <div className="relative w-[280px] mx-auto aspect-[9/16] bg-gray-100 rounded-xl overflow-hidden">
                      <video
                        src={recordedVideo}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setRecordedVideo(null);
                          setVideoFile(null);
                        }}
                        className="bg-gray-200 px-6 py-3 rounded-full font-medium text-[2.2svh] text-gray-700"
                      >
                        Hapus Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={handleOpenModal}
                        className="w-full bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-2xl">📹</span>
                        <span className="text-xl text-green-700">
                          Rekam Video
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-2xl">📁</span>
                        <span className="text-xl text-green-700">
                          Upload Video
                        </span>
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}
                {errors.video && (
                  <p className="text-red-500 text-sm mt-1">{errors.video}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700" htmlFor="nama">
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-white border-2 rounded-xl p-4 text-xl ${
                    errors.name ? "border-red-500" : "border-[#C9CDC2]"
                  }`}
                  placeholder="Masukan nama kamu"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xl text-green-700" htmlFor="pesan">
                  Pesan
                </label>
                <textarea
                  className={`w-full h-80 bg-white border-2 rounded-xl p-4 text-xl ${
                    errors.message ? "border-red-500" : "border-[#C9CDC2]"
                  }`}
                  id="pesan"
                  name="pesan"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Masukan pesan kamu"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const randomTemplate =
                      messageTemplates[
                        Math.floor(Math.random() * messageTemplates.length)
                      ];
                    setMessage(randomTemplate.template);
                  }}
                  className="w-fit bg-[#046511] text-white px-4 py-2 rounded-full font-medium text-[2.2svh] hover:bg-[#03540d] transition-colors mt-2"
                >
                  Coba Template
                </button>
              </div>
              <SignatureInput onSave={setSignature} />
              <div className="flex flex-col gap-4">
                <div className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={agreeToDisplay}
                    onChange={(e) => setAgreeToDisplay(e.target.checked)}
                    className="w-4 h-4 bg-transparent border-[#C9CDC2]"
                  />
                  <label className="text-xl text-[#383C33]">
                    Setuju kalau video kamu tayang di web
                  </label>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={handleOpenPreview}
                    className="flex items-center gap-2 bg-transparent border-2 border-green-700 px-4 py-2 rounded-full font-medium md:text-[2.2svh] text-[1.8svh] text-green-700 hover:bg-green-700 hover:text-white transition-colors group"
                  >
                    Preview
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
                      className="transition-all group-hover:brightness-0 group-hover:invert"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#92ED00] px-6 py-4 rounded-full font-medium text-2xl text-[#046511] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <RecordVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
      />

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={handleClosePreview}
              className="absolute -right-4 -top-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative flex flex-col sm:flex-row justify-center">
              <div className="relative z-10 transform -rotate-6">
                <div className="bg-white w-[280px] aspect-[9/16] max-h-[50svh] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3">
                  <div className="w-full h-full overflow-hidden">
                    <video
                      src={recordedVideo}
                      alt="polaroid"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full h-auto">
                    <p className="text-lg sm:text-xl font-otherHand text-green-700">
                      {name}
                    </p>

                    <img
                      src="/assets/icons/green-maaf-sign.svg"
                      alt="icon"
                      className="w-6 h-6 sm:w-auto sm:h-auto"
                    />
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
