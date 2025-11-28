import Joi from "joi";
import { countriesEnum, provincesEnum } from "../../models/Order.js";
import { colorsEnum, sizeEnum } from "../../models/Furniture.js";


const cloudinaryUrlRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9_-]+\/image\/upload(?:\/v\d+)?\/.+\.(jpg|jpeg|png|gif|webp)$/i;

export const orderValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        furniture: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
        color: Joi.string().valid(...colorsEnum.map(c => c.name)).required(),
        size: Joi.string().valid(...sizeEnum).required(),

        image: Joi.string()
          .pattern(cloudinaryUrlRegex)
          .required()
          .messages({
            "string.empty": "Image URL is required.",
            "string.uri": "Image must be a valid URL.",
            "string.pattern.base": "Image must be a valid Cloudinary URL with a supported image format (jpg, jpeg, png, gif, webp)."
          })
      })
    )
    .min(1)
    .required(),

  billingAddress: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    company: Joi.string().allow("", null),
    country: Joi.string().valid(...countriesEnum).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().valid(...provincesEnum).allow("", null),
    zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required().messages({
      "string.pattern.base": "ZIP code is not valid."
    }),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.pattern.base": "Phone number must be exactly 10 digits."
    }),
    email: Joi.string().email().required(),
    addInfo: Joi.string().min(3).max(300).allow("", null)
  }).required(),

  paymentMethod: Joi.string().valid("COD", "Online").required(),

  totalAmount: Joi.number().required()
});