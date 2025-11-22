import Joi from "joi";
import { categoryEnum, colorsEnum, roomTypeEnum, sizeEnum } from "../../models/Furniture.js";

// Joi schema for a single color
const colorSchema = Joi.object({
  name: Joi.string().valid(...colorsEnum.map(c => c.name)),
  hex: Joi.string().pattern(/^#([0-9A-Fa-f]{6})$/),
});

// Joi schema for images
const imageSchema = Joi.object({
  url: Joi.string().uri().allow(null, ""),
  public_id: Joi.string().allow(null, ""),
});

// Joi schema for furniture updates (all fields optional)
export const furnitureUpdateValidationSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().min(20),
  category: Joi.string().valid(...categoryEnum),
  size: Joi.array().items(Joi.string().valid(...sizeEnum)).min(1),
  roomType: Joi.string().valid(...roomTypeEnum),
  images: Joi.array().items(imageSchema).min(1).max(4),
  price: Joi.number(),
  stock: Joi.number().min(0),
  colors: Joi.array().items(colorSchema),
  tags: Joi.array().items(Joi.string()),
  ratings: Joi.object({
    average: Joi.number(),
    count: Joi.number(),
  }),
  isFeatured: Joi.boolean(),
  existingImages: Joi.string(), // JSON.stringified array
});