import Joi from '@hapi/joi';

const workerSchema = Joi.object({
  work: Joi.string(),
  role: Joi.string(),
  name: Joi.string(),
  app: Joi.string(),
  handle: Joi.string(),
  supportOthers: Joi.string(),
  healthcare: Joi.string(),
});

export const workersSchema = Joi.array().items(workerSchema);

export const getWorkersQuerySchema = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
});

export const getWorkersParamsSchema = Joi.object({
  userId: Joi.string(),
});

export const postWorkersPayloadSchema = workerSchema;

export const putWorkersPayloadSchema = workerSchema;

export const putWorkerParamsSchema = Joi.object({
  userId: Joi.string().required(),
});

export const deleteWorkerParamsSchema = Joi.object({
  userId: Joi.string().required(),
});
