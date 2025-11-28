import mongoose from "mongoose";
import { upload } from "../middlewares/multer.js";
import Furniture from "../models/Furniture.js";
import { removeImage } from "../utils/removeImage.js";



// Get all Data
export const getMultipleData = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = ['sort', 'fields', 'search', 'page', 'limit', 'skip', 'relatedTo'];
    excludedFields.forEach((field) => {
      delete queryObject[field]
    })

    // RELATED ITEMS FILTER
    if (req.query.relatedTo) {
      const currentItem = await Furniture.findById(req.query.relatedTo);
      if (currentItem) {
        queryObject._id = { $ne: currentItem._id }; // exclude current item
        queryObject.$or = [
          { category: currentItem.category },
          { roomType: currentItem.roomType }
        ];
      }
    }

    // Search Handling
    if (req.query.search) {
      const searchText = req.query.search;

      const regex = new RegExp(searchText, "i");

      queryObject.$or = [
        { name: regex },
        { category: regex },
        { roomType: regex },
        // { description: regex },
        { tags: { $in: [regex] } }
      ];
    }

    let query = Furniture.find(queryObject);

    // SORTING
    if (req.query.sort) {
      const sorting = req.query.sort.split(',').join(' ');
      query = query.sort(sorting);
    } else {
      query = query.sort('-createdAt'); // default: newest first
    }

    // FIELD SELECTION
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination and Limit
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query and count total items
    const [furniture, totalItems] = await Promise.all([
      query,
      Furniture.countDocuments(queryObject)
    ]);
    const totalPage = Math.ceil(totalItems / limit);
    return res.status(200).json({
      furniture,
      totalItems,
      page,
      totalPage
    })

  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
}

// get singleData
export const getSingleData = async (req, res) => {

  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid Id' })
    const furniture = await Furniture.findById(id);
    if (!furniture) { return res.status(404).json({ message: 'Data not found' }) }
    return res.status(200).json({ furniture })
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }

}


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
    res.status(500).json({ message: err?.message });
  }
}






// Data update
export const updateData = async (req, res) => {
  const newlyUploaded = [];
  // let oldImages = [];

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }

    const furniture = await Furniture.findById(id);
    if (!furniture) return res.status(404).json({ message: "Data not found" });

    // Parse existingImages sent from frontend
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // Prevent images from being empty
    if (!existingImages.length && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ message: "At least 1 image is required." });
    }

    // Identify old images that will be deleted
    const imagesToDelete = furniture.images.filter(
      (img) => !existingImages.some((e) => e.public_id === img.public_id)
    );


    // Handle new file uploads
    if (req.files?.length > 0) {
      // Delete old images after successful upload
      // oldImages = [...furniture.images];

      // furniture.images = []; // reset

      for (const file of req.files) {
        const uploaded = await upload("furnitures").uploadToCloudinary(file.buffer, file.originalname);

        const imageObj = { url: uploaded.secure_url, public_id: uploaded.public_id };
        newlyUploaded.push(imageObj);
        // furniture.images.push(imageObj);
      }

    }

    // Merge existing images + newly uploaded images
    furniture.images = [...existingImages, ...newlyUploaded]

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
    await removeImage(imagesToDelete);

    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    // Rollback newly uploaded images if something goes wrong
    await removeImage(newlyUploaded);
    res.status(500).json({ message: err?.message });
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
    res.status(500).json({ message: err?.message });
  }
};
