import cloudinary from "../../config/cloudinaryConfig.js";
import axios from "axios";
import crypto from "crypto";

export const uploadSnapshot = async (imageUrl, furnitureId) => {
  try {
    // Download image and generate content hash
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = response.data;
    const hash = crypto.createHash("md5").update(imageBuffer).digest("hex");

    const public_id = `e-commerce/orders/${furnitureId}_${hash}`;

    // Check if snapshot already exists in Cloudinary
    try {
      const existing = await cloudinary.api.resource(public_id);
      return {
        url: existing.secure_url,
        public_id: existing.public_id
      };
    } catch (err) {
      if (err.http_code === 404) {
        const result = await cloudinary.uploader.upload(imageUrl, { public_id });
        return { url: result.secure_url, public_id: result.public_id };
      }
      throw err; // rethrow other errors
    }
  } catch (err) {
    throw new Error(`Failed to upload order snapshot image: ${err.message}`);
  }

};