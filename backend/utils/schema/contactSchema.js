import Joi from "joi";


export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().trim(),
  email: Joi.string().email().required(),
  subject: Joi.string().allow("", null).max(150),
  message: Joi.string().min(5).trim().required()

});