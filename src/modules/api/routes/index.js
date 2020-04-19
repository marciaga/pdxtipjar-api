import { initWorkerRoutes } from './workers.js';

export const initRoutes = ({ server, baseUrl }) => {
  initWorkerRoutes(baseUrl).map(r => server.route(r));
};

