import axios from "axios";

const XENDIT_SECRET_KEY =
  "xnd_development_asCYzHIFKes96vBg0aMCh6gLooDHK9ByhAJTd2ddxeAwc04NWmzBEchx7olWRo";
const XENDIT_BUSINESS_ID = "6715e27ff21862e24d0bb8fd";

const xenditApi = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    Authorization: `Basic ${Buffer.from(XENDIT_SECRET_KEY + ":").toString(
      "base64"
    )}`,
    "Content-Type": "application/json",
  },
});

export async function createPaymentRequest({ amount, orderId, customerInfo }) {
  try {
    // Log the request payload for debugging
    const payload = {
      amount: amount,
      currency: "IDR",
      payment_method: {
        type: "QR_CODE",
        reusability: "ONE_TIME_USE",
        qr_code: {
          channel_properties: {
            expires_at: new Date(
              Date.now() + 24 * 60 * 60 * 1000
            ).toISOString(), // 24 hours from now
          },
        },
      },
      description: "Moon Muffin Order Payment",
      metadata: {
        orderId: orderId,
      },
      customer_details: {
        email: customerInfo.email,
        phone_number: customerInfo.whatsapp,
        given_names: customerInfo.name,
      },
    };
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    const response = await xenditApi.post("/payment_requests", payload);

    // Log the full response
    console.log("Xendit Payment Request Response:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Enhanced error logging
    console.error("Error creating Xendit payment request:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Response Data:", error.response?.data);
    console.error("Error Message:", error.message);

    return {
      success: false,
      error: error.response?.data?.message || error.message,
      details: error.response?.data || null,
    };
  }
}

export async function verifyWebhook(payload, signature) {
  try {
    // For now, we'll just verify the signature matches
    const expectedSignature =
      "va8gJkIZAuNyq2c4d0QUpsJNfBfg9vFNdnVKLKi9mW6D1kkL";
    return signature === expectedSignature;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return false;
  }
}
