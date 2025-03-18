"use server";

import axios from "axios";

const xenditApi = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY + ":"
    ).toString("base64")}`,
    "Content-Type": "application/json",
    "api-version": "2022-07-31",
  },
});

export async function createPaymentRequest({ amount, orderId, customerInfo }) {
  try {
    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const response = await xenditApi.post("/qr_codes", {
      reference_id: orderId,
      type: "DYNAMIC",
      currency: "IDR",
      amount: amount,
      expires_at: expiresAt.toISOString(),
    });

    return {
      success: true,
      data: {
        id: response.data.id,
        reference_id: response.data.reference_id,
        amount: response.data.amount,
        status: response.data.status,
        qr_string: response.data.qr_string,
        expires_at: response.data.expires_at,
        channel_code: response.data.channel_code,
      },
    };
  } catch (error) {
    console.error(
      "Error creating payment request:",
      error.response?.data || error
    );
    return {
      success: false,
      error:
        error.response?.data?.message || "Failed to create payment request",
      details: error.response?.data || error,
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
