import { initWorkerRoutes } from './workers.mjs';

export const initRoutes = ({ server, baseUrl }) => {
  initWorkerRoutes(baseUrl).map(r => server.route(r));
};

