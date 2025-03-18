import { NextResponse } from "next/server";
import crypto from "crypto";

const LALAMOVE_API_KEY = process.env.LALAMOVE_API_KEY;
const LALAMOVE_SECRET = process.env.LALAMOVE_SECRET;
const LALAMOVE_BASE_URL = process.env.LALAMOVE_BASE_URL || "https://rest.lalamove.com";

// Fungsi untuk mendapatkan signature
const generateSignature = (method, path, timestamp, body = "") => {
  const rawSignature = `${timestamp}\n${method}\n${path}\n${body}\n`;
  const signature = crypto.createHmac("sha256", LALAMOVE_SECRET).update(rawSignature).digest("hex");
  return signature;
};

export async function POST(request) {
  try {
    const stops = await request.json();
    const timestamp = new Date().getTime();
    const path = "/v3/quotations";
    const method = "POST";

    const body = {
      data: {
        serviceType: "MOTORCYCLE",
        language: "id_ID",
        stops: stops,
        item: {
          quantity: "1",
          weight: "LESS_THAN_3KG",
          categories: ["FOOD_DELIVERY"],
          handlingInstructions: ["KEEP_UPRIGHT"],
        },
        isRouteOptimized: true,
      },
    };

    const signature = generateSignature(method, path, timestamp, JSON.stringify(body));

    const response = await fetch(`${LALAMOVE_BASE_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `hmac ${LALAMOVE_API_KEY}:${timestamp}:${signature}`,
        Market: "ID",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lalamove API error:", errorData);
      throw new Error(`Failed to get quotation: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting delivery quotation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
