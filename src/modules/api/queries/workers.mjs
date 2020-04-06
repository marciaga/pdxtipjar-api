export const standardColumns = [
  'user_id',
  'work',
  'role',
  'name',
  'app',
  'handle',
  'support_others',
  'healthcare',
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

export const deleteWorkerQuery = `DELETE
  FROM workers
  WHERE user_id=$1
`;
