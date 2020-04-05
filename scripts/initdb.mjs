import dotenv from 'dotenv';
import postgres from 'postgres';

const init = async () => {
  dotenv.config();

  try {
    // connect to the local database server
    const sql = postgres();

    console.log('dropping table, if exists...');
    await sql`DROP TABLE IF EXISTS workers`;

    console.log('creating table...');
    await sql`CREATE TABLE IF NOT EXISTS workers (
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

    await sql.end();
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
