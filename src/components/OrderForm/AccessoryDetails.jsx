import React, { useState } from "react";
import SignatureInput from "@/components/SignatureInput";
import Message from "@/components/Message";
import { toast } from "react-hot-toast";
import { messageTemplates } from "@/constants/messageTemplates";

const AccessoryDetails = ({
  formData,
  handleInputChange,
  selectedFile,
  handleFileChange,
  onSaveSignature,
  signatureImage,
  errors,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleOpenPreview = () => {
    if (!selectedFile) {
      toast("Upload foto dulu yaa!");
      return;
    }
    if (!formData.namaPolaroid?.trim()) {
      toast("Namanya tolong diisi yaa!");
      return;
    }
    if (!formData.pesan?.trim()) {
      toast("Pesannya tolong diisi yaa!");
      return;
    }

    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleTemplateSelect = () => {
    const randomTemplate =
      messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    const message = randomTemplate.template;

    handleInputChange({
      target: {
        name: "pesan",
        value: message,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl text-green-700 mb-4">Kelengkapan Aksesoris</h2>
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
              onClick={() => document.getElementById("attachment").click()}
              className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] flex justify-between items-center cursor-pointer ${
                errors?.file ? "border-red-500" : "border-[#C9CDC2]"
              }`}
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
            {errors?.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label
            className="md:text-[2.6svh] text-[2.2svh] text-green-700"
            htmlFor="namaPolaroid"
          >
            Nama di Polaroid
          </label>
          <input
            className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
              errors?.namaPolaroid ? "border-red-500" : "border-[#C9CDC2]"
            }`}
            type="text"
            id="namaPolaroid"
            name="namaPolaroid"
            value={formData.namaPolaroid || ""}
            onChange={handleInputChange}
            placeholder="Masukan nama yang akan dicetak di polaroid"
            required
          />
          {errors?.namaPolaroid && (
            <p className="text-red-500 text-sm mt-1">{errors.namaPolaroid}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label
            className="md:text-[2.6svh] text-[2.2svh] text-green-700"
            htmlFor="pesan"
          >
            Pesan
          </label>
          <textarea
            className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
              errors?.pesan ? "border-red-500" : "border-[#C9CDC2]"
            }`}
            id="pesan"
            name="pesan"
            value={formData.pesan || ""}
            onChange={handleInputChange}
            placeholder="Masukan pesan yang akan dicetak di polaroid"
            required
            rows={10}
          />
          {errors?.pesan && (
            <p className="text-red-500 text-sm mt-1">{errors.pesan}</p>
          )}
          <button
            type="button"
            onClick={handleTemplateSelect}
            className="w-fit bg-[#046511] text-white px-4 py-2 rounded-full font-medium md:text-[2.2svh] text-[1.8svh] hover:bg-[#03540d] transition-colors mt-2"
          >
            Coba Template
          </button>
        </div>

        <SignatureInput onSave={onSaveSignature} />

        <div className="flex justify-start mt-4">
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
                <div className="bg-white w-full sm:w-[360px] h-[434px] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3">
                  <div className="w-full h-full overflow-hidden">
                    {selectedFile && (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="polaroid"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center w-full h-auto">
                    <p className="text-lg sm:text-xl font-otherHand text-green-700">
                      {formData.namaPolaroid}
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
                <Message message={formData.pesan} signature={signatureImage} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoryDetails;
