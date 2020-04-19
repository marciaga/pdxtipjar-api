import apiPlugin from './modules/api/index.js';
import dbPlugin from './modules/db/sql.js';
import authPlugin from './modules/auth/jwt.js';
import loggerPlugin from './modules/logger/logger.js';

const buildManifest = (vars) => {
  return {
    server: {
      port: 3000,
      routes: {
        cors: {
          origin: ['*'],
        }
      }
    },
    register: {
      plugins: [{
        plugin: authPlugin,
      }, {
        plugin: dbPlugin,
      }, {
        plugin: apiPlugin,
      }, {
        plugin: loggerPlugin,
      }],
    }
  };
};

export default buildManifest;