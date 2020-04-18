import pg from 'pg';

const plugin = {
  pkg: {
    name: 'pg',
    version: '0.0.1',
  },
  register: async (server) => {
    const config = {
      user: process.env.PGUSERNAME,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    };

    if (process.env.NODE_ENV !== 'development') {
      config.ssl = true;
    }

    const pool = new pg.Pool(config);

    const query = (text, params) => pool.query(text, params);
    const methods = {
      query,
    };
    // add to the request toolkit e.g. h.pg
    server.decorate('toolkit', 'pg', methods);
  }
};

export default plugin;