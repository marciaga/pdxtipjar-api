import apiPlugin from './modules/api/index.mjs';

const buildManifest = (vars) => {
  return {
    server: {
      port: 3000,
    },
    register: {
      plugins: [{
        plugin: apiPlugin,
      }],
    }
  };
};

export default buildManifest;