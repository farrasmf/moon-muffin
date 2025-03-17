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

      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`namaPenerima-${nomor}`}
        >
          Nama Penerima
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
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
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label
          className="md:text-[2.6svh] text-[2.2svh] text-green-700"
          htmlFor={`whatsappPenerima-${nomor}`}
        >
          Nomor WhatsApp Penerima
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
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
            placeholder="Pilih provinsi"
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
            placeholder="Pilih kabupaten/kota"
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
            placeholder="Pilih kecamatan"
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
            placeholder="Pilih kelurahan"
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
