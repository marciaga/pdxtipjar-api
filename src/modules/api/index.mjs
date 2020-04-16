import { API_BASE_URL } from './constants.mjs';
import { initRoutes } from './routes/index.mjs';

const apiPlugin = (server) => {
  initRoutes({
    server,
    baseUrl: API_BASE_URL,
  });

  server.route({
    path: `${API_BASE_URL}/health`,
    method: 'GET',
    config: {
      handler: () => ({ status: 'OK' }),
    },
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