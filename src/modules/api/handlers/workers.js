import Boom from '@hapi/boom';
import uniqid from 'uniqid';

import {
  getWorkersQuery,
  getWorkersByIdQuery,
  createWorkerQuery,
  updateWorkerQuery,
  deleteWorkerQuery,
  standardColumns,
  getWorkersCountQuery,
  getRandomWorkerQuery,
} from '../queries/workers.js';

const standardizeCols = (cols) => {
  const slicedCols = cols.slice(1, cols.length); // remove user_id
  return slicedCols;
};

export const getHandler = async (request, h) => {
  try {
    const { query, params } = request;
    const { userId } = params;
    const { q, limit = 50, offset = 0 } = query;
    const searchQ = q ? `%${q}%` : null;

    let result;

    if (userId) {
      result = await h.pg.query(getWorkersByIdQuery, [userId, offset, limit]);
    } else {
      result = await h.pg.query(getWorkersQuery, [searchQ, offset, limit]);
    }

    const response = await h.pg.query(getWorkersCountQuery);
    const { rows: r } = response;
    const count = r.length ? r[0].reltuples : '0'; // reltuples is a string

    const { rows } = result;

    return {
      count: parseInt(count, 10),
      workers: rows,
    };
  } catch (error) {
    console.log('err , ', error)
    return Boom.serverUnavailable('unavailable');
  }
};

export const getRandomHandler = async (request, h) => {
  try {
    const result = await h.pg.query(getRandomWorkerQuery, []);
    const { rows } = result;

    return { workers: rows };
  } catch (error) {
    console.log('error: ', error);
    return Boom.serverUnavailable('unavailable');
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
    return Boom.serverUnavailable('unavailable');
  }
};

export const putHandler = async (request, h) => {
  try {
    const { payload, params } = request;
    const { userId } = params;

    const values = { userId, ...payload };
    const putValues = standardColumns
      .map(c => values[c]);

    await h.pg.query(updateWorkerQuery, putValues);

    return {
      success: true,
    };
  } catch (error) {
    console.log('err , ', error)
    return Boom.serverUnavailable('unavailable');
  }
};

export const deleteHandler = async (request, h) => {
  try {
    const { params } = request;

    await h.pg.query(deleteWorkerQuery, [params.userId]);

    return { success: true };
  } catch (error) {
    console.log('err , ', error)
    return Boom.serverUnavailable('unavailable');
  }
};
