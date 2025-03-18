const LALAMOVE_API_KEY = process.env.NEXT_PUBLIC_LALAMOVE_API_KEY;
const LALAMOVE_SECRET = process.env.LALAMOVE_SECRET;
const LALAMOVE_BASE_URL = process.env.NEXT_PUBLIC_LALAMOVE_BASE_URL;

// Fungsi untuk mendapatkan signature
const generateSignature = (method, path, timestamp, body = "") => {
  const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  const signature = crypto.createHmac("sha256", LALAMOVE_SECRET).update(rawSignature).digest("hex");
  return signature;
};

// Fungsi untuk mendapatkan quotation (biaya pengiriman)
export const getDeliveryQuotation = async (stops) => {
  try {
    const response = await fetch("/api/quotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stops),
    });

    if (!response.ok) {
      throw new Error("Failed to get quotation");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting delivery quotation:", error);
    throw error;
  }
};
