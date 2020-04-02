import { API_BASE_URL } from './constants.mjs';

const apiPlugin = (server) => {
  server.route({
    path: `${API_BASE_URL}/health`,
    method: 'GET',
    config: {
      handler: () => ({ status: 'OK' }),
    },
  });
};

const plugin = {
  pkg: {
    name: 'api',
    version: "0.0.1",
  },
  register: apiPlugin,
};

export default plugin;