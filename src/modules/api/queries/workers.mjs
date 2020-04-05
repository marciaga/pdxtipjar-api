export const getWorkersQuery = `SELECT
  user_id, work, role, name, app, handle, support_others, healthcare
  FROM workers
  OFFSET $1 ROWS
  FETCH FIRST $2 ROW ONLY
`;

export const getWorkersByIdQuery = `SELECT
  user_id, work, role, name, app, handle, support_others, healthcare
  FROM workers
  WHERE user_id=$1
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY
`;