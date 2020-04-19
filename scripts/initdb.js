import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const init = async () => {

  try {
    const config = {
      user: process.env.PGUSERNAME,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: process.env.PGSSLMODE,
    };

    const client = new pg.Pool(config);
    
    console.log('dropping table, if exists...');
    const dropTableQuery = `DROP TABLE IF EXISTS workers`;

    await client.query(dropTableQuery);

    console.log('creating table...');
    const createTableQuery = `CREATE TABLE IF NOT EXISTS workers (
      id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
      , user_id varchar(50) NOT NULL
      , work text NOT NULL
      , role text NOT NULL
      , name text NOT NULL
      , app text NOT NULL
      , handle text NOT NULL
      , support_others text NULL
      , healthcare text NULL
    )`;

    await client.query(createTableQuery);

    client.end();
    console.log('success')
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const main = async () => {
  try {
    await init();
    console.log('finished');
  } catch (error) {
    console.log('finished with errors: ', error);
  }
};

main();
