"use server";

import { supabase } from "@/utils/supabase/server";

/**
 * Fungsi untuk menyimpan data pesanan ke Supabase
 * @param {Object} orderData - Data pesanan dari form
 * @returns {Object} - Hasil operasi
 */
export async function createOrder(orderData) {
  try {
    // Ekstrak data customer
    const { customerInfo, pesanan, selectedFile, signatureImage, selectedTHR } =
      orderData;

    // Simpan data ke tabel orders
    const { data: orderInsert, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_name: customerInfo.name,
        email: customerInfo.email,
        whatsapp: customerInfo.whatsapp,
        polaroid_url: selectedFile
          ? await uploadFile(selectedFile, "polaroids")
          : null,
        caption: customerInfo.memo,
        signature_url: signatureImage
          ? await uploadBase64Image(signatureImage, "signatures")
          : null,
        message: customerInfo.message,
        status: "created",
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Error saat menyimpan order: ${orderError.message}`);
    }

    // Dapatkan ID order yang baru dibuat
    const orderId = orderInsert.id;

    // Persiapkan data shipping untuk dimasukkan ke tabel shipping
    const shippingData = pesanan.map((item) => ({
      order_id: orderId,
      item_total: item.jumlahItem,
      recipient_name: item.namaPenerima,
      whatsapp: item.whatsappPenerima,
      address: `${item.alamat}, ${item.kelurahan}, ${item.kecamatan}, ${item.kota}, ${item.provinsi} ${item.kodePos}`,
      allowance: selectedTHR[item.nomor] || null,
    }));

    // Simpan data ke tabel shipping
    const { error: shippingError } = await supabase
      .from("shippings")
      .insert(shippingData);

    if (shippingError) {
      throw new Error(
        `Error saat menyimpan shipping: ${shippingError.message}`
      );
    }

    return {
      success: true,
      data: {
        orderId,
        orderData: orderInsert,
      },
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fungsi untuk mengupload file ke Supabase Storage
 * @param {File} file - File yang akan diupload
 * @param {string} bucket - Nama bucket penyimpanan
 * @returns {string} - URL file yang diupload
 */
async function uploadFile(file, bucket) {
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
async function uploadBase64Image(base64String, bucket) {
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
