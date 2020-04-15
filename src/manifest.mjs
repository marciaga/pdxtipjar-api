import apiPlugin from './modules/api/index.mjs';
import dbPlugin from './modules/db/sql.mjs';
import authPlugin from './modules/auth/jwt.mjs';
import loggerPlugin from './modules/logger/logger.mjs';

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