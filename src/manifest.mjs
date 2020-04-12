import apiPlugin from './modules/api/index.mjs';
import dbPlugin from './modules/db/sql.mjs';
import authPlugin from './modules/auth/jwt.mjs';

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
        plugin: apiPlugin,
      }, {
        plugin: dbPlugin,
      }, {
        plugin: authPlugin,
      }],
    }
  };
};

export default buildManifest;