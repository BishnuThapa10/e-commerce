import joi from 'joi';

export const loginSchema = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().min(8).max(40).required()
});

export const registerSchema = joi.object({
  name: joi.string().trim().min(3).required(),
  email: joi.string().trim().email().required(),
  password: joi.string().min(8).max(40).required()
});