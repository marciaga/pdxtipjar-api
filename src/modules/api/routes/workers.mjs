import {
  getWorkersParamsSchema,
  getWorkersQuerySchema,
  postWorkersPayloadSchema,
  putWorkersPayloadSchema,
  putWorkerParamsSchema,
  deleteWorkerParamsSchema,
} from '../schemas/worker.mjs';
import {
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
} from '../handlers/workers.mjs';

export const initWorkerRoutes = (baseUrl) => [
  {
    method: 'GET',
    path: `${baseUrl}/workers/{userId?}`,
    handler: getHandler,
    options: {
      validate: {
        params: getWorkersParamsSchema,
        query: getWorkersQuerySchema,
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

/* PUT workers
 * body: 
  work, role, name, app, handle, support_others, healthcare
*/