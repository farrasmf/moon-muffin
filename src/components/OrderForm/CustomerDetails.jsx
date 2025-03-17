import React from "react";

const CustomerDetails = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-2xl text-green-700 mb-4">Detail Pemesan</h2>
      <div className="border-2 rounded-xl p-4 mb-8 bg-white">
        <div className="flex flex-col gap-1 mb-6">
          <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor="name">
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
          <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor="email">
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
          <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor="whatsapp">
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
    </div>
  );
};

export default CustomerDetails;
