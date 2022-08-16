import Joi from "joi";

export const productValidation = Joi.object().keys({
  title: Joi.string().min(2).required(),
  price: Joi.number().positive().required(),
})

export const updateProductValidation = Joi.object().keys({
  title: Joi.string().min(2),
  price: Joi.number().positive(),
})
