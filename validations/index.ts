import Joi from "joi";

export const groceryItemSchema = Joi.object({
  itemId: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string(),
  brand: Joi.string(),
  weight: Joi.number(),
});

export const bookingSchemaValidation = Joi.object({
  userName: Joi.string().required(),
  itemIds: Joi.array().items(Joi.string().required()).required(),
});

export const itemIdsValidator = Joi.object({
  itemIds: Joi.array().items(Joi.string().required()).required(),
});
