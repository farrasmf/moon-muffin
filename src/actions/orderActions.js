"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fungsi untuk menyimpan data pesanan ke Supabase
 * @param {Object} orderData - Data pesanan dari form
 * @returns {Object} - Hasil operasi
 */
export async function createOrder(orderData) {
  try {
    // Extract customer data and order details
    const { customerInfo, pesanan, selectedTHR, selectedFile, signatureImage } =
      orderData;

    // Handle file uploads first
    let polaroidUrl = null;
    let signatureUrl = null;

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}_${Date.now()}.${fileExt}`;

      const { data: fileData, error: fileError } = await supabase.storage
        .from("polaroids")
        .upload(fileName, selectedFile);

      if (fileError) {
        console.error("Error uploading polaroid:", fileError);
        return {
          success: false,
          error: "Error saat mengupload file polaroid",
          details: fileError,
        };
      }

      const { data: urlData } = supabase.storage
        .from("polaroids")
        .getPublicUrl(fileName);

      polaroidUrl = urlData.publicUrl;
    }

    if (signatureImage) {
      const base64Data = signatureImage.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }

      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], { type: "image/png" });
      const fileName = `signature_${Date.now()}.png`;

      const { data: signatureData, error: signatureError } =
        await supabase.storage.from("signatures").upload(fileName, blob);

      if (signatureError) {
        console.error("Error uploading signature:", signatureError);
        return {
          success: false,
          error: "Error saat mengupload signature",
          details: signatureError,
        };
      }

      const { data: urlData } = supabase.storage
        .from("signatures")
        .getPublicUrl(fileName);

      signatureUrl = urlData.publicUrl;
    }

    // Create payment record first
    const { data: paymentData, error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          payment_id: customerInfo.paymentId,
          external_id: customerInfo.paymentId,
          amount: 10000, // This should match the amount from Xendit
          status: "pending",
          payment_method: "qris",
        },
      ])
      .select()
      .single();

    if (paymentError) {
      console.error("Error creating payment:", paymentError);
      return {
        success: false,
        error: "Error saat menyimpan payment",
        details: paymentError,
      };
    }

    if (!paymentData) {
      console.error("No payment data returned");
      return {
        success: false,
        error: "Error saat menyimpan payment: No data returned",
        details: "No payment data returned",
      };
    }

    // Insert order data
    const { data: createdOrder, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_name: customerInfo.name,
          email: customerInfo.email,
          whatsapp: customerInfo.whatsapp,
          caption: customerInfo.caption,
          message: customerInfo.message,
          delivery_date: customerInfo.delivery_date,
          status: "pending",
          payment_id: paymentData.payment_id,
          polaroid_url: polaroidUrl,
          signature_url: signatureUrl,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return {
        success: false,
        error: "Error saat menyimpan order",
        details: orderError,
      };
    }

    // Insert shipping data for each order
    for (const order of pesanan) {
      const { error: shippingError } = await supabase.from("shippings").insert([
        {
          order_id: createdOrder.id,
          recipient_name: order.namaPenerima,
          whatsapp: order.whatsappPenerima,
          address: order.alamat,
          item_total: parseInt(order.jumlahItem),
          allowance: selectedTHR[order.nomor] || "0",
        },
      ]);

      if (shippingError) {
        console.error("Error creating shipping:", shippingError);
        return {
          success: false,
          error: "Error saat menyimpan shipping",
          details: shippingError,
        };
      }
    }

    return {
      success: true,
      data: createdOrder,
    };
  } catch (error) {
    console.error("Error in createOrder:", error);
    return {
      success: false,
      error: `Terjadi kesalahan saat membuat pesanan: ${
        error.message || error
      }`,
      details: error,
    };
  }
}

/**
 * Fungsi untuk mengupload file ke Supabase Storage
 * @param {File} file - File yang akan diupload
 * @param {string} bucket - Nama bucket penyimpanan
 * @returns {string} - URL file yang diupload
 */
export async function uploadFile(file, bucket) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    // Dapatkan URL publik file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Fungsi untuk mengupload gambar base64 ke Supabase Storage
 * @param {string} base64String - String base64 dari gambar
 * @param {string} bucket - Nama bucket penyimpanan
 * @returns {string} - URL gambar yang diupload
 */
export async function uploadBase64Image(base64String, bucket) {
  try {
    // Konversi base64 string ke blob
    const base64Data = base64String.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Buat nama file unik
    const fileName = `signature_${Date.now()}.png`;

    // Upload blob ke Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, blob);

    if (error) throw error;

    // Dapatkan URL publik file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading base64 image:", error);
    throw error;
  }
}
