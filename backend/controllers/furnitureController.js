import mongoose from "mongoose";
import { upload } from "../middlewares/multer.js";
import Furniture from "../models/Furniture.js";
import { removeImage } from "../utils/removeImage.js";

// Data insert
export const createData = async (req, res) => {
  let uploadedImages = [];

  try {

    const furnitureData = req.body;

    if (req.files?.length > 0) {
      for (const file of req.files) {
        const uploaded = await upload("furnitures").uploadToCloudinary(file.buffer, file.originalname);
        uploadedImages.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id
        });
      }
    }

    furnitureData.images = uploadedImages;

    const furniture = new Furniture(furnitureData);
    await furniture.save();

    res.status(201).json({ message: "Data added successfully" })

  } catch (err) {
    await removeImage(uploadedImages);
    res.status(500).json({ message: err.message || err });
  }
}






// Data update
export const updateData = async (req, res) => {
  const newlyUploaded = [];
  let oldImages = [];

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const furniture = await Furniture.findById(id);
    if (!furniture) return res.status(404).json({ message: "Data not found" });


    // Replace images if new files uploaded
    if (req.files?.length > 0) {
      // Delete old images after successful upload
      oldImages = [...furniture.images];

      furniture.images = []; // reset

      for (const file of req.files) {
        const uploaded = await upload("furnitures").uploadToCloudinary(file.buffer, file.originalname);

        const imageObj = { url: uploaded.secure_url, public_id: uploaded.public_id };
        newlyUploaded.push(imageObj);
        furniture.images.push(imageObj);
      }

    }

    //  const fieldsToUpdate = [
    //   "name",
    //   "description",
    //   "category",
    //   "size",
    //   "roomType",
    //   "price",
    //   "stock",
    //   "colors",
    //   "tags",
    //   "ratings",
    //   "isFeatured",
    // ];

    // fieldsToUpdate.forEach(field => {
    //   if (req.body[field] !== undefined) {
    //     furniture[field] = req.body[field];
    //   }
    // });

    // --- Update simple fields ---
    if (req.body.name !== undefined) furniture.name = req.body.name;
    if (req.body.description !== undefined) furniture.description = req.body.description;
    if (req.body.category !== undefined) furniture.category = req.body.category;
    if (req.body.size !== undefined) furniture.size = req.body.size;
    if (req.body.roomType !== undefined) furniture.roomType = req.body.roomType;
    if (req.body.price !== undefined) furniture.price = req.body.price;
    if (req.body.stock !== undefined) furniture.stock = req.body.stock;
    if (req.body.tags !== undefined) furniture.tags = req.body.tags;
    if (req.body.isFeatured !== undefined) furniture.isFeatured = req.body.isFeatured;
     if (req.body.colors !== undefined) furniture.colors = req.body.colors;

    if (req.body.ratings !== undefined) {
      furniture.ratings = {
        average: req.body.ratings.average ?? furniture.ratings.average,
        count: req.body.ratings.count ?? furniture.ratings.count,
      };
    }

    await furniture.save();

    // Delete old images after DB update
    await removeImage(oldImages);

    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    // Rollback newly uploaded images if something goes wrong
    await removeImage(newlyUploaded);
    res.status(500).json({ message: err.message || err });
  }
};



// Remove Data
export const removeData = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const furniture = await Furniture.findById(id);
    if (!furniture) return res.status(404).json({ message: "Data not found" });

    // Delete all images from Cloudinary
    await removeImage(furniture.images);

    // Delete post from DB
    await furniture.deleteOne();

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
