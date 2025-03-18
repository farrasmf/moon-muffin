"use client";

import { createContext, useContext, useState } from "react";

const OrderContext = createContext(undefined);

export function OrderProvider({ children }) {
  const [orderData, setOrderData] = useState({
    customerInfo: {
      name: "",
      email: "",
      whatsapp: "",
      memo: "",
      message: "",
    },
    selectedTHR: {},
    selectedFile: null,
    signatureImage: null,
    pesanan: [],
  });

  return (
    <OrderContext.Provider
      value={{
        orderData,
        setOrderData,
        updateCustomerInfo: (info) => {
          setOrderData((prev) => ({
            ...prev,
            customerInfo: {
              ...prev.customerInfo,
              ...info,
            },
          }));
        },
        updatePesanan: (pesanan) => {
          setOrderData((prev) => ({
            ...prev,
            pesanan,
          }));
        },
        updateSelectedTHR: (THR) => {
          setOrderData((prev) => ({
            ...prev,
            selectedTHR: THR,
          }));
        },
        updateFile: (file) => {
          setOrderData((prev) => ({
            ...prev,
            selectedFile: file,
          }));
        },
        updateSignature: (signature) => {
          setOrderData((prev) => ({
            ...prev,
            signatureImage: signature,
          }));
        },
        calculateTotal: () => {
          const biayaPerItem = 50000; // Harga per item Moon Muffin
          const biayaPengiriman = 10000; // Biaya pengiriman standar

          return orderData.pesanan.reduce((total, item) => {
            const itemQuantity = parseInt(item.jumlahItem) || 0;
            const THR = orderData.selectedTHR[item.nomor] || 0;

            return total + itemQuantity * biayaPerItem + THR + biayaPengiriman;
          }, 0);
        },
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
