import {
  getWorkersParamsSchema,
  getWorkersQuerySchema,
  postWorkersPayloadSchema,
} from '../schemas/worker.mjs';
import { getHandler, postHandler } from '../handlers/workers.mjs';

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
];

/* PUT workers
 * body: 
  work, role, name, app, handle, support_others, healthcare
*/

/* DELETE workers
 * params: user_id
*/




