import laabr from 'laabr';

const plugin = {
  pkg: {
    name: 'logger',
    version: '0.0.1',
  },
  register: async (server) => {
    server.register(laabr);
  }
};

export default plugin;