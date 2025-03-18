import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/server";
import crypto from "crypto";

const XENDIT_WEBHOOK_SECRET = process.env.XENDIT_WEBHOOK_SECRET;

function verifyXenditSignature(payload, signature) {
  if (!XENDIT_WEBHOOK_SECRET) {
    console.warn("XENDIT_WEBHOOK_SECRET is not set");
    return true; // Skip verification in development
  }

  const hmac = crypto.createHmac("sha256", XENDIT_WEBHOOK_SECRET);
  const calculatedSignature = hmac
    .update(JSON.stringify(payload))
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const signature = request.headers.get("x-callback-token");

    console.log("Received Xendit callback:", payload);

    // Verify the callback is from Xendit
    if (!verifyXenditSignature(payload, signature)) {
      console.error("Invalid Xendit signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const {
      external_id,
      status,
      qr_string,
      amount,
      paid_amount,
      paid_at,
      payment_method,
      payment_channel,
      payment_destination,
      paid_currency,
      transaction_timestamp,
      transaction_id,
      merchant_name,
      merchant_id,
      currency,
      channel_code,
      business_id,
      reference_id,
      customer_id,
      payment_method_id,
      payment_request_id,
      payment_id,
      created,
      updated,
      metadata,
    } = payload;

    // Update payment status in database
    const { error } = await supabase.from("payments").upsert({
      payment_id: payment_id || external_id,
      external_id,
      status,
      amount,
      paid_amount,
      paid_at,
      payment_method,
      payment_channel,
      payment_destination,
      paid_currency,
      transaction_timestamp,
      transaction_id,
      merchant_name,
      merchant_id,
      currency,
      channel_code,
      business_id,
      reference_id,
      customer_id,
      payment_method_id,
      payment_request_id,
      metadata,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error updating payment status:", error);
      return NextResponse.json(
        { error: "Failed to update payment status" },
        { status: 500 }
      );
    }

    // If payment is successful, update order status
    if (status === "PAID") {
      const { error: orderError } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("payment_id", external_id);

      if (orderError) {
        console.error("Error updating order status:", orderError);
        return NextResponse.json(
          { error: "Failed to update order status" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing callback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
