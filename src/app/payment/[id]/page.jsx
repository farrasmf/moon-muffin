"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const xenditApi = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY + ":"
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default function PaymentPage() {
  const params = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentDetails() {
      try {
        const response = await xenditApi.get(`/payment_requests/${params.id}`);
        console.log("Payment details response:", response.data);
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        setError(
          error.response?.data?.message || "Failed to load payment details"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentDetails();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-xl text-center text-green-700">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-xl text-center text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-[#EDF0E7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-xl text-center text-red-700">
            Payment details not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDF0E7] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-medium text-green-700 mb-6 text-center">
          Payment Details
        </h1>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium text-green-700">
              Rp {paymentDetails.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span
              className={`font-medium ${
                paymentDetails.status === "PAID"
                  ? "text-green-700"
                  : "text-yellow-600"
              }`}
            >
              {paymentDetails.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expires At</span>
            <span className="font-medium text-green-700">
              {new Date(
                paymentDetails.payment_method.qr_code.channel_properties.expires_at
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex justify-center items-center w-full mb-8">
          <QRCodeSVG
            value={
              paymentDetails.payment_method.qr_code.channel_properties.qr_string
            }
            size={240}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <p className="text-center font-medium">Payment Instructions:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open your e-wallet app (GoPay, OVO, DANA, etc.)</li>
            <li>Select "Scan QR Code"</li>
            <li>Scan the QR code above</li>
            <li>Enter the exact amount shown</li>
            <li>Confirm the payment</li>
            <li>Wait for the payment confirmation</li>
          </ol>
          <p className="text-center text-yellow-600 mt-4">
            Note: This QR code will expire after 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
