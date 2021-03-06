import Joi from '@hapi/joi';

const workerSchema = Joi.object({
  work: Joi.string(),
  role: Joi.string(),
  name: Joi.string(),
  app: Joi.string(),
  handle: Joi.string(),
  support_others: Joi.string(),
  healthcare: Joi.string(),
});

export const workersSchema = Joi.array().items(workerSchema);

export const getWorkersQuerySchema = Joi.object({
  q: Joi.string().alphanum().allow(''),
  limit: Joi.number(),
  offset: Joi.number(),
});

export const getWorkersParamsSchema = Joi.object({
  userId: Joi.string(),
});

export const postWorkersPayloadSchema = workerSchema;

export const putWorkersPayloadSchema = Joi.object({
  work: Joi.string(),
  role: Joi.string(),
  name: Joi.string(),
  app: Joi.string(),
  handle: Joi.string(),
  support_others: Joi.string(),
  healthcare: Joi.string(),
  user_id: Joi.string(),
});

export const putWorkerParamsSchema = Joi.object({
  userId: Joi.string().required(),
});

export const deleteWorkerParamsSchema = Joi.object({
  userId: Joi.string().required(),
});
