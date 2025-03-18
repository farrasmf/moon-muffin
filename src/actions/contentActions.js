"use server";

import { supabase } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Validasi apakah order_id valid
 * @param {string} orderId - ID order yang akan divalidasi
 * @returns {Promise<boolean>} - True jika order valid, false jika tidak
 */
export async function validateOrderId(orderId) {
  try {
    // Periksa apakah order_id ada di tabel orders
    const { data, error } = await supabase
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .single();

    if (error || !data) {
      console.error("Order tidak valid:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validasi order:", error);
    return false;
  }
}

/**
 * Fungsi untuk menyimpan konten video dan pesan
 * @param {FormData} formData - Data formulir
 * @param {string} orderId - ID order
 * @returns {Object} - Hasil operasi
 */
export async function saveContent(formData, orderId) {
  try {
    // Validasi orderId terlebih dahulu
    const isOrderValid = await validateOrderId(orderId);
    if (!isOrderValid) {
      return {
        success: false,
        error: "Order ID tidak valid",
      };
    }

    // Ambil data dari formData
    const name = formData.get("nama");
    const message = formData.get("pesan");
    const videoFile = formData.get("video");
    const signatureBase64 = formData.get("signature");

    if (!name || !message || !videoFile) {
      throw new Error("Nama, pesan, dan video harus diisi");
    }

    // Upload video ke Supabase Storage dengan progress
    console.log("Uploading video...");
    const videoUrl = await uploadFile(videoFile, "contents");
    console.log("Video uploaded successfully");

    // Upload signature (base64) ke Supabase Storage jika ada
    let signatureUrl = null;
    if (signatureBase64) {
      console.log("Uploading signature...");
      signatureUrl = await uploadBase64Image(signatureBase64, "contents");
      console.log("Signature uploaded successfully");
    }

    // Simpan data ke tabel contents
    console.log("Saving data to database...");
    const { data, error } = await supabase
      .from("contents")
      .insert({
        name,
        message,
        video_url: videoUrl,
        signature_url: signatureUrl,
        order_id: orderId,
        consent: formData.get("consent") === "1",
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error saat menyimpan konten: ${error.message}`);
    }

    console.log("Data saved successfully");
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error menyimpan konten:", error);
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
    const fileName = `video_${Date.now()}.${fileExt}`;

    console.log(`Starting upload of ${fileName} to ${bucket}...`);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    console.log("File uploaded successfully");

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
    if (!base64String) return null;

    // Konversi base64 string ke blob
    const base64Data = base64String.split(",")[1];
    if (!base64Data) return null;

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
    return null;
  }
}
