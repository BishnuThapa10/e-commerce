import cloudinary from "../config/cloudinaryConfig.js";

export const removeImage = async (images) => {
  if (!images || images.length === 0) return;

  // Normalize input: accept array of objects or array of strings
  const publicIds = images.map(img => (typeof img === "string" ? img : img.public_id));

  await Promise.all(
    publicIds.map(async (id) => {
      try {
        await cloudinary.uploader.destroy(id);
      } catch (err) {
        console.error(`Failed to delete image ${id} from Cloudinary:`, err);
      }
    })
  );
}