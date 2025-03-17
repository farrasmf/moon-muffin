// Dummy data for provinces
export const dummyProvinces = [
  { code: "31", name: "DKI JAKARTA" },
  { code: "32", name: "JAWA BARAT" },
  { code: "36", name: "BANTEN" },
];

// Dummy data for regencies (cities)
export const dummyRegencies = {
  31: [
    // DKI JAKARTA
    { code: "31.71", name: "KOTA JAKARTA PUSAT", province_code: "31" },
    { code: "31.72", name: "KOTA JAKARTA UTARA", province_code: "31" },
    { code: "31.73", name: "KOTA JAKARTA BARAT", province_code: "31" },
    { code: "31.74", name: "KOTA JAKARTA SELATAN", province_code: "31" },
    { code: "31.75", name: "KOTA JAKARTA TIMUR", province_code: "31" },
  ],
  32: [
    // JAWA BARAT
    { code: "32.74", name: "KOTA BOGOR", province_code: "32" },
    { code: "32.75", name: "KOTA DEPOK", province_code: "32" },
    { code: "32.76", name: "KOTA BEKASI", province_code: "32" },
    { code: "32.01", name: "KABUPATEN BOGOR", province_code: "32" },
    { code: "32.16", name: "KABUPATEN BEKASI", province_code: "32" },
  ],
  36: [
    // BANTEN
    { code: "36.71", name: "KOTA TANGERANG", province_code: "36" },
    { code: "36.72", name: "KOTA TANGERANG SELATAN", province_code: "36" },
    { code: "36.03", name: "KABUPATEN TANGERANG", province_code: "36" },
  ],
};

// Dummy data for districts
export const dummyDistricts = {
  31.71: [
    // JAKARTA PUSAT
    { code: "31.71.01", name: "TANAH ABANG", regency_code: "31.71" },
    { code: "31.71.02", name: "MENTENG", regency_code: "31.71" },
    { code: "31.71.03", name: "SENEN", regency_code: "31.71" },
    { code: "31.71.04", name: "JOHAR BARU", regency_code: "31.71" },
    { code: "31.71.05", name: "CEMPAKA PUTIH", regency_code: "31.71" },
    { code: "31.71.06", name: "KEMAYORAN", regency_code: "31.71" },
    { code: "31.71.07", name: "SAWAH BESAR", regency_code: "31.71" },
    { code: "31.71.08", name: "GAMBIR", regency_code: "31.71" },
  ],
  // ... (data lainnya tetap sama)
};

// Dummy data for villages
export const dummyVillages = {
  "31.71.01": [
    // TANAH ABANG
    {
      code: "31.71.01.1001",
      name: "KEBON MELATI",
      district_code: "31.71.01",
      postal_code: "10230",
    },
    // ... (data lainnya tetap sama)
  ],
  // ... (data lainnya tetap sama)
};
