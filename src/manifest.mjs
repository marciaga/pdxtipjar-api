import apiPlugin from './modules/api/index.mjs';
import dbPlugin from './modules/db/sql.mjs';

const buildManifest = (vars) => {
  return {
    server: {
      port: 3000,
    },
    register: {
      plugins: [{
        plugin: apiPlugin,
      }, {
        plugin: dbPlugin,
      }],
    }
  };
};

export default buildManifest;