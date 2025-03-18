"use client";

import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orderData, setOrderData] = useState({
    customerInfo: null,
    pesanan: [],
    selectedTHR: {},
    selectedFile: null,
    signatureImage: null,
    deliveryQuotations: {},
  });

  const updateCustomerInfo = (customerInfo) => {
    setOrderData((prev) => ({
      ...prev,
      customerInfo,
    }));
  };

  const updatePesanan = (pesanan) => {
    setOrderData((prev) => ({
      ...prev,
      pesanan,
    }));
  };

  const updateSelectedTHR = (selectedTHR) => {
    setOrderData((prev) => ({
      ...prev,
      selectedTHR,
    }));
  };

  const updateFile = (file) => {
    setOrderData((prev) => ({
      ...prev,
      selectedFile: file,
    }));
  };

  const updateSignature = (signature) => {
    setOrderData((prev) => ({
      ...prev,
      signatureImage: signature,
    }));
  };

  const updateDeliveryQuotations = (quotations) => {
    setOrderData((prev) => ({
      ...prev,
      deliveryQuotations: quotations,
    }));
  };

  const calculateTotal = () => {
    if (!orderData.pesanan) return 0;

    return orderData.pesanan.reduce((total, item) => {
      const hargaItem = 50000 * (parseInt(item.jumlahItem) || 0);
      const thr = parseInt(orderData.selectedTHR[item.nomor]) || 0;
      const biayaPengiriman = orderData.deliveryQuotations[item.nomor] || 0;
      return total + hargaItem + thr + biayaPengiriman;
    }, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orderData,
        updateCustomerInfo,
        updatePesanan,
        updateSelectedTHR,
        updateFile,
        updateSignature,
        updateDeliveryQuotations,
        calculateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
