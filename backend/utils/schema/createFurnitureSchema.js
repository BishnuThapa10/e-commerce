import Joi from "joi";
import { categoryEnum, colorsEnum, roomTypeEnum, sizeEnum } from "../../models/Furniture.js";


const colorSchema = Joi.object({
  name: Joi.string()
    .valid(...colorsEnum.map(c => c.name))
    .required(),
  hex: Joi.string()
    .pattern(/^#([0-9A-Fa-f]{6})$/)
    .required(),
});

// Joi schema for images
const imageSchema = Joi.object({
  url: Joi.string().uri().allow(null, ""),
  public_id: Joi.string().allow(null, ""),
});

// Main Joi validation schema for furniture
export const furnitureValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().min(20).required(),
  category: Joi.string().valid(...categoryEnum).required(),
  size: Joi.string().valid(...sizeEnum).required(),
  roomType: Joi.string().valid(...roomTypeEnum).required(),
  images: Joi.array().items(imageSchema).default([]),
  price: Joi.number().required(),
  stock: Joi.number().min(0).required(),
  colors: Joi.array().items(colorSchema).default([]),
  tags: Joi.array().items(Joi.string()).default([]),
  ratings: Joi.object({
    average: Joi.number().default(0),
    count: Joi.number().default(0),
  }).default({ average: 0, count: 0 }),
  isFeatured: Joi.boolean().default(false),
});