import {
  getWorkersParamsSchema,
  getWorkersQuerySchema,
  getWorkersSearchQuerySchema,
  postWorkersPayloadSchema,
  putWorkersPayloadSchema,
  putWorkerParamsSchema,
  deleteWorkerParamsSchema,
} from '../schemas/worker.js';
import {
  getHandler,
  getRandomHandler,
  getBySearchHandler,
  postHandler,
  putHandler,
  deleteHandler,
} from '../handlers/workers.js';

export const initWorkerRoutes = (baseUrl) => [
  {
    method: 'GET',
    path: `${baseUrl}/workers/{userId?}`,
    handler: getHandler,
    options: {
      auth: false,
      validate: {
        params: getWorkersParamsSchema,
        query: getWorkersQuerySchema,
      },
    },
  },
  {
    method: 'GET',
    path: `${baseUrl}/workers/random`,
    handler: getRandomHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: `${baseUrl}/workers/search`,
    handler: getBySearchHandler,
    options: {
      validate: {
        query: getWorkersSearchQuerySchema,
      },
    },
  },
  {
    method: 'POST',
    path: `${baseUrl}/workers`,
    handler: postHandler,
    options: {
      validate: {
        payload: postWorkersPayloadSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: `${baseUrl}/workers/{userId}`,
    handler: putHandler,
    options: {
      validate: {
        payload: putWorkersPayloadSchema,
        params: putWorkerParamsSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${baseUrl}/workers/{userId}`,
    handler: deleteHandler,
    options: {
      validate: {
        params: deleteWorkerParamsSchema,
      },
    },
  },
];
