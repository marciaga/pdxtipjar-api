import { getWorkersQuery, getWorkersByIdQuery } from '../queries/workers.mjs';

export const getHandler = async (request, h) => {
  try {
    const { query, params } = request;
    const { userId } = params;
    const { limit = 100, offset = 0 } = query;

    let result;

    if (userId) {
      result = await h.pg.query(getWorkersByIdQuery, [userId, offset, limit]);
    } else {
      result = await h.pg.query(getWorkersQuery, [offset, limit]);
    }

    const { rows } = result;

    return { workers: rows };
  } catch (error) {
    console.log('err , ', error)
    // handle error with Boom
  }
};
