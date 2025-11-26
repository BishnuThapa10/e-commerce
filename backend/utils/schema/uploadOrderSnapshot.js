import cloudinary from "../../config/cloudinaryConfig.js";
import axios from "axios";
import crypto from "crypto";

export const uploadSnapshot = async (imageUrl, furnitureId) => {
  try {
    // Download image and generate content hash
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;
    const hash = crypto.createHash("md5").update(imageBuffer).digest("hex");

    const filename = `${furnitureId}_${hash}`;

    // Check if snapshot already exists in Cloudinary
    let existing;
    try {
      existing = await cloudinary.api.resource(`e-commerce/orders/${filename}`);
    } catch (err) {
      if (err?.error?.http_code === 404 || (err.http_code === 404)) {
        existing = null;
      } else {
        throw err; // rethrow other errors
      }
    }

    if (existing) {
      return { url: existing.secure_url, public_id: existing.public_id };
    }

    // Upload buffer directly
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder: "e-commerce/orders",
        public_id: filename,
        overwrite: true
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(imageBuffer);
    });

    return { url: result.secure_url, public_id: result.public_id };

  } catch (err) {
    console.error("Upload snapshot error:", err);
    throw new Error(`Failed to upload order snapshot image: ${err?.message || JSON.stringify(err)}`);
  }

};