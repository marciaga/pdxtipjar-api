import { API_BASE_URL } from './constants.js';
import { initRoutes } from './routes/index.js';

const apiPlugin = (server) => {
  initRoutes({
    server,
    baseUrl: API_BASE_URL,
  });

  server.route({
    path: `${API_BASE_URL}/kill`,
    method: 'GET',
    handler: () => {
      process.exit(1);
    },
    options: {
      auth: false,
    },
  })

  server.route({
    path: `${API_BASE_URL}/health`,
    method: 'GET',
    handler: () => ({ status: 'OK' }),
    options: {
      auth: false,
    },
  });
};

const plugin = {
  pkg: {
    name: 'api',
    version: '0.0.1',
  },
  register: apiPlugin,
};

export default plugin;