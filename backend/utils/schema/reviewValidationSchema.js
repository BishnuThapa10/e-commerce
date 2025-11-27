import Joi from "joi";


export const reviewValidationSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().min(10).max(500).optional().allow(null, '')
});