import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function GET() {
  try {
    const { data, error } = await supabase.from("contents").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { name, message } = await req.json();
  const order_id = "AAAA"; // Default order_id
  const created_at = new Date().toISOString(); // Use current timestamp

  // Get public URLs for video and signature
  const videoPublicURL = supabase.storage
    .from("moonmuffin")
    .getPublicUrl("uploads/line-decoration-right.png").data.publicUrl;
  const signaturePublicURL = supabase.storage
    .from("moonmuffin")
    .getPublicUrl("uploads/line-decoration-right.png").data.publicUrl;

  try {
    const { data, error } = await supabase.from("gallery").insert([
      {
        created_at,
        name,
        message,
        video_url: videoPublicURL,
        signature_url: signaturePublicURL,
        order_id,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
