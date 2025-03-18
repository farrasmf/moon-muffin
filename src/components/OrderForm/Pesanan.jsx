import React, { useState, useEffect } from "react";
import {
  dummyRegencies,
  dummyDistricts,
  dummyVillages,
} from "@/data/locationData";

const Pesanan = ({
  nomor,
  formData,
  handlePesananChange,
  handleRemove,
  handleTHRChange,
  selectedTHR,
  provinces,
  errors,
}) => {
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
    namaPenerima: "",
    whatsappPenerima: "",
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

  const getFilteredOptions = (items, field, searchTerm) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const handleLocationSelect = (field, value, codeField, code) => {
    // Close dropdown first to ensure immediate visual feedback
    setDropdownStates({
      province: false,
      regency: false,
      district: false,
      village: false,
    });

    // Then update the values
    handlePesananChange(nomor, field, value);
    handlePesananChange(nomor, codeField, code);
    setSearchTerms((prev) => ({ ...prev, [field]: "" }));

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
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.jumlahItem ? "border-red-500" : "border-[#C9CDC2]"
          }`}
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
        {errors?.jumlahItem && (
          <p className="text-red-500 text-sm mt-1">{errors.jumlahItem}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`namaPenerima-${nomor}`}
        >
          Nama Penerima
        </label>
        <input
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.namaPenerima ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          type="text"
          id={`namaPenerima-${nomor}`}
          name={`namaPenerima-${nomor}`}
          value={pesananData.namaPenerima}
          onChange={(e) =>
            handlePesananChange(nomor, "namaPenerima", e.target.value)
          }
          placeholder="Masukan nama penerima"
          required
        />
        {errors?.namaPenerima && (
          <p className="text-red-500 text-sm mt-1">{errors.namaPenerima}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`whatsappPenerima-${nomor}`}
        >
          Nomor WhatsApp Penerima
        </label>
        <input
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.whatsappPenerima ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          type="tel"
          id={`whatsappPenerima-${nomor}`}
          name={`whatsappPenerima-${nomor}`}
          value={pesananData.whatsappPenerima}
          onChange={(e) =>
            handlePesananChange(nomor, "whatsappPenerima", e.target.value)
          }
          placeholder="Masukan nomor WhatsApp penerima"
          required
        />
        {errors?.whatsappPenerima && (
          <p className="text-red-500 text-sm mt-1">{errors.whatsappPenerima}</p>
        )}
      </div>

      {/* Province Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`provinsi-${nomor}`}
        >
          Provinsi
        </label>
        <input
          type="text"
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.provinsi ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          id={`provinsi-${nomor}`}
          name={`provinsi-${nomor}`}
          value={pesananData.provinsi}
          onChange={(e) =>
            handlePesananChange(nomor, "provinsi", e.target.value)
          }
          placeholder="Masukan nama provinsi"
          required
        />
        {errors?.provinsi && (
          <p className="text-red-500 text-sm mt-1">{errors.provinsi}</p>
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
        <input
          type="text"
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.kota ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          id={`kota-${nomor}`}
          name={`kota-${nomor}`}
          value={pesananData.kota}
          onChange={(e) => handlePesananChange(nomor, "kota", e.target.value)}
          placeholder="Masukan nama kabupaten/kota"
          required
        />
        {errors?.kota && (
          <p className="text-red-500 text-sm mt-1">{errors.kota}</p>
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
        <input
          type="text"
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.kecamatan ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          id={`kecamatan-${nomor}`}
          name={`kecamatan-${nomor}`}
          value={pesananData.kecamatan}
          onChange={(e) =>
            handlePesananChange(nomor, "kecamatan", e.target.value)
          }
          placeholder="Masukan nama kecamatan"
          required
        />
        {errors?.kecamatan && (
          <p className="text-red-500 text-sm mt-1">{errors.kecamatan}</p>
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
        <input
          type="text"
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.kelurahan ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          id={`kelurahan-${nomor}`}
          name={`kelurahan-${nomor}`}
          value={pesananData.kelurahan}
          onChange={(e) =>
            handlePesananChange(nomor, "kelurahan", e.target.value)
          }
          placeholder="Masukan nama kelurahan"
          required
        />
        {errors?.kelurahan && (
          <p className="text-red-500 text-sm mt-1">{errors.kelurahan}</p>
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
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.kodePos ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          type="text"
          id={`kodePos-${nomor}`}
          name={`kodePos-${nomor}`}
          value={pesananData.kodePos}
          onChange={(e) =>
            handlePesananChange(nomor, "kodePos", e.target.value)
          }
          placeholder="Masukan kode pos"
          required
        />
        {errors?.kodePos && (
          <p className="text-red-500 text-sm mt-1">{errors.kodePos}</p>
        )}
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
          className={`w-full max-w-full bg-white border-2 rounded-xl p-4 md:text-[2.6svh] text-[2.2svh] ${
            errors?.alamat ? "border-red-500" : "border-[#C9CDC2]"
          }`}
          id={`alamat-${nomor}`}
          name={`alamat-${nomor}`}
          value={pesananData.alamat}
          onChange={(e) => handlePesananChange(nomor, "alamat", e.target.value)}
          placeholder="Masukan alamat lengkap (nama jalan, nomor rumah, RT/RW, patokan)"
          required
          rows={3}
        />
        {errors?.alamat && (
          <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
        )}
      </div>

      {/* THR Section */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700">
          Tambah THR (Opsional)
        </label>
        <div className="flex gap-2">
          {[5000, 10000, 20000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => {
                if (selectedTHR[nomor] === amount) {
                  handleTHRChange(nomor, null);
                } else {
                  handleTHRChange(nomor, amount);
                }
              }}
              className={`px-4 py-2 rounded-full ${
                selectedTHR[nomor] === amount ? "bg-[#C9CDC2]" : "bg-gray-200"
              }`}
            >
              Rp. {amount.toLocaleString()}
            </button>
          ))}
        </div>
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
};

export default Pesanan;
