import React, { useState, useEffect } from "react";

const Pesanan = ({ nomor, formData, handlePesananChange, handleRemove, handleTHRChange, selectedTHR, provinces }) => {
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

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchTerms, setSearchTerms] = useState({
    searchQuery: "",
  });

  const [dropdownStates, setDropdownStates] = useState({
    searchResults: false,
  });

  // Fungsi untuk mencari data lokasi menggunakan API
  const searchLocation = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`http://localhost:3001/search/?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const result = await response.json();
      setSearchResults(result.data || []);
    } catch (error) {
      console.error("Error searching location:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setDropdownStates((prev) => ({ ...prev, searchResults: true }));
    }
  };

  // Debounce untuk pencarian
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerms.searchQuery) {
        searchLocation(searchTerms.searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerms.searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownStates({
          searchResults: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  // Fungsi untuk memilih data dari hasil pencarian
  const handleSearchResultSelect = (result) => {
    handlePesananChange(nomor, "provinsi", result.province);
    handlePesananChange(nomor, "kota", result.regency);
    handlePesananChange(nomor, "kecamatan", result.district);
    handlePesananChange(nomor, "kelurahan", result.village);
    handlePesananChange(nomor, "kodePos", result.code.toString());
    handlePesananChange(nomor, "latitude", result.latitude);
    handlePesananChange(nomor, "longitude", result.longitude);

    // Reset search UI state
    setDropdownStates({ searchResults: false });
    setSearchTerms({ searchQuery: "" });
    setSearchResults([]);
  };

  return (
    <div className="border-2 rounded-xl p-4 mb-4 bg-white">
      <h2 className="text-2xl text-green-700 mb-4">Pesanan #{nomor}</h2>
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`jumlahItem-${nomor}`}>
          Jumlah Item
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="number"
          id={`jumlahItem-${nomor}`}
          name={`jumlahItem-${nomor}`}
          value={pesananData.jumlahItem}
          onChange={(e) => handlePesananChange(nomor, "jumlahItem", e.target.value)}
          placeholder="Masukan jumlah item"
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`namaPenerima-${nomor}`}>
          Nama Penerima
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`namaPenerima-${nomor}`}
          name={`namaPenerima-${nomor}`}
          value={pesananData.namaPenerima}
          onChange={(e) => handlePesananChange(nomor, "namaPenerima", e.target.value)}
          placeholder="Masukan nama penerima"
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`whatsappPenerima-${nomor}`}>
          Nomor WhatsApp Penerima
        </label>
        <input
          className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="tel"
          id={`whatsappPenerima-${nomor}`}
          name={`whatsappPenerima-${nomor}`}
          value={pesananData.whatsappPenerima}
          onChange={(e) => handlePesananChange(nomor, "whatsappPenerima", e.target.value)}
          placeholder="Masukan nomor WhatsApp penerima"
          required
        />
      </div>

      {/* Pencarian Lokasi API */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`searchLocation-${nomor}`}>
          Cari Lokasi
        </label>
        <div className="relative dropdown-container">
          <input
            type="text"
            className="w-full max-w-full bg-white border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
            id={`searchLocation-${nomor}`}
            placeholder="Cari desa/kelurahan/kecamatan (minimal 3 karakter)"
            value={searchTerms.searchQuery}
            onChange={(e) => setSearchTerms((prev) => ({ ...prev, searchQuery: e.target.value }))}
            onClick={() => setDropdownStates((prev) => ({ ...prev, searchResults: true }))}
          />

          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="animate-spin h-5 w-5 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {dropdownStates.searchResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl max-h-60 overflow-y-auto shadow-lg">
              {searchResults.map((result, index) => (
                <div key={index} className="p-3 hover:bg-gray-100 cursor-pointer" onClick={() => handleSearchResultSelect(result)}>
                  <div className="font-medium">
                    {result.village}, {result.district}
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.regency}, {result.province} - {result.code}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Province Selection */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`provinsi-${nomor}`}>
          Provinsi
        </label>
        <input
          className="w-full max-w-full bg-gray-50 border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`provinsi-${nomor}`}
          name={`provinsi-${nomor}`}
          value={pesananData.provinsi}
          readOnly
          placeholder="Provinsi akan terisi otomatis"
        />
      </div>

      {/* Regency/City */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`kota-${nomor}`}>
          Kabupaten/Kota
        </label>
        <input
          className="w-full max-w-full bg-gray-50 border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`kota-${nomor}`}
          name={`kota-${nomor}`}
          value={pesananData.kota}
          readOnly
          placeholder="Kabupaten/kota akan terisi otomatis"
        />
      </div>

      {/* District */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`kecamatan-${nomor}`}>
          Kecamatan
        </label>
        <input
          className="w-full max-w-full bg-gray-50 border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`kecamatan-${nomor}`}
          name={`kecamatan-${nomor}`}
          value={pesananData.kecamatan}
          readOnly
          placeholder="Kecamatan akan terisi otomatis"
        />
      </div>

      {/* Village */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`kelurahan-${nomor}`}>
          Kelurahan/Desa
        </label>
        <input
          className="w-full max-w-full bg-gray-50 border-2 border-[#C9CDC2] rounded-xl p-4 md:text-[2.6svh] text-[2.2svh]"
          type="text"
          id={`kelurahan-${nomor}`}
          name={`kelurahan-${nomor}`}
          value={pesananData.kelurahan}
          readOnly
          placeholder="Kelurahan/desa akan terisi otomatis"
        />
      </div>

      {/* Postal Code */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`kodePos-${nomor}`}>
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
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700" htmlFor={`alamat-${nomor}`}>
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
        <label className="md:text-[2.6svh] text-[2.2svh] text-green-700">Tambah THR (Opsional)</label>
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
              className={`px-4 py-2 rounded-full ${selectedTHR[nomor] === amount ? "bg-[#C9CDC2]" : "bg-gray-200"}`}
            >
              Rp. {amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Delete Button */}
      {nomor > 1 && (
        <button type="button" onClick={() => handleRemove(nomor)} className="bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
          </svg>
          Hapus Pesanan
        </button>
      )}
    </div>
  );
};

export default Pesanan;
