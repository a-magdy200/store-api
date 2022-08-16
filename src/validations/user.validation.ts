import Joi from "joi";

export const userValidation = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})
export const updateUserValidation = Joi.object().keys({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6),
})
