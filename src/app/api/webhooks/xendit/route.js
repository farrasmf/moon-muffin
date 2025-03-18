import { NextResponse } from "next/server";
import { verifyWebhook } from "@/actions/xenditActions";
import { createOrder } from "@/actions/orderActions";

export async function POST(request) {
  try {
    const signature = request.headers.get("x-callback-signature");
    const payload = await request.json();

    // Verify webhook signature
    const isValid = await verifyWebhook(payload, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle payment success
    if (payload.status === "PAID") {
      const orderId = payload.metadata.orderId;
      const orderData = payload.metadata.orderData;

      // Create order in database
      const result = await createOrder({
        ...orderData,
        status: "paid",
        paymentId: payload.id,
      });

      if (!result.success) {
        console.error("Failed to create order:", result.error);
        return NextResponse.json(
          { error: "Failed to create order" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
