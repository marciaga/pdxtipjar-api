import { getWorkersParamsSchema, getWorkersQuerySchema } from '../schemas/worker.mjs';
import { getHandler } from '../handlers/workers.mjs';

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
];

/* POST workers
 * body: 
  work, role, name, app, handle, support_others, healthcare
*/

/* PUT workers
 * body: 
  work, role, name, app, handle, support_others, healthcare
*/

/* DELETE workers
 * params: user_id
*/




