import Joi from '@hapi/joi';

export const workerSchema = Joi.object({
  userId: Joi.string(),
  work: Joi.string(),
  role: Joi.string(),
  name: Joi.string(),
  app: Joi.string(),
  handle: Joi.string(),
  supportOthers: Joi.string(),
  healthcare: Joi.string(),
});

export const getWorkersQuerySchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
});

export const getWorkersParamsSchema = Joi.object({
  userId: Joi.string(),
});

export const workersSchema = Joi.array().items(workerSchema);