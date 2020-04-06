import uniqid from 'uniqid';

import { snakeToCamel } from '../../../utils/string.mjs';
import {
  getWorkersQuery,
  getWorkersByIdQuery,
  createWorkerQuery,
  deleteWorkerQuery,
  standardColumns,
} from '../queries/workers.mjs';

const standardizeCols = (cols) => {
  const slicedCols = cols.slice(1, cols.length); // remove user_id
  return slicedCols.map(col => snakeToCamel(col)); // ensure everything's camel-cased
};

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

export const postHandler = async (request, h) => {
  try {
    const { payload } = request;

    const userId = uniqid();
    const postCols = standardizeCols(standardColumns);
    const baseCols = postCols.map(col => payload[col]);
    const columnValues = [userId, ...baseCols];
  
    await h.pg.query(createWorkerQuery, columnValues);

    return {
      success: true,
      userId,
    };
  } catch (error) {
    console.log('err , ', error)
    // handle error with Boom
  }
};

export const deleteHandler = async (request, h) => {
  try {
    const { params } = request;

    await h.pg.query(deleteWorkerQuery, [params.userId]);

    return { success: true };
  } catch (error) {
    console.log('err , ', error)
    // handle error with Boom
  }
};
