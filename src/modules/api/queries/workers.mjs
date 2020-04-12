const baseCols = [
  'work',
  'role',
  'name',
  'app',
  'handle',
  'support_others',
  'healthcare',
];

export const standardColumns = [
  'user_id',
  ...baseCols,
];

export const getWorkersQuery = `SELECT
  ${standardColumns}
  FROM workers
  OFFSET $1 ROWS
  FETCH FIRST $2 ROW ONLY
`;

export const getWorkersByIdQuery = `SELECT
  ${standardColumns}
  FROM workers
  WHERE user_id=$1
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY
`;

export const createWorkerQuery = `INSERT
  INTO workers(${standardColumns.join(',')})
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ${standardColumns.join(',')}
`;

export const updateWorkerQuery = `UPDATE
  workers
  SET work = $2,
  role = $3,
  name = $4,
  app = $5,
  handle = $6,
  support_others = $7,
  healthcare = $8
  WHERE
  user_id=$1;
`;

export const deleteWorkerQuery = `DELETE
  FROM workers
  WHERE user_id=$1
`;

export const getWorkersCountQuery = `
  SELECT reltuples::bigint
  FROM pg_catalog.pg_class
  WHERE relname = 'workers';
`;

export const getRandomWorkerQuery = `
  SELECT ${standardColumns} 
  FROM workers OFFSET floor(random() * (
    SELECT COUNT(*)
    FROM workers))
  LIMIT 1
`;

export const getWorkersBySearchQuery = `
  SELECT ${standardColumns}
  FROM workers
  WHERE name ILIKE $1
    OR work ILIKE $1
`;