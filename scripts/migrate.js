const pg = require('pg');
const dotenv = require('dotenv');
const fastcsv = require('fast-csv');
const axios = require('axios');
const uniqid = require('uniqid');

dotenv.config();

const CSV_URL = process.env.CSV_URL;

// declare a new client instance from Pool()
const client = new pg.Pool({
  user: process.env.PGUSERNAME,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  sslmode: process.env.PGSSLMODE,
});

axios({
  method: 'GET',
  url: CSV_URL,
  responseType: 'stream',
})
.then((response) => {
  const stream = response.data;

  let csvData = [];
  const csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      const id = uniqid();
      const tmp = [id, ...data];
      csvData.push(tmp);
    })
    .on('end', () => {
      // remove the first line: header
      csvData.shift();

      const query = 'INSERT INTO workers (user_id, work, role, name, app, handle, support_others, healthcare) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

      client.connect()
      .then(async () => {
          const promises = csvData.map(row => client.query(query, row));

          await Promise.all(promises);

          client.end();
          console.log('success')
          process.exit(0);
        })
      .catch(e => console.log('exception caught ', e));
    });

  stream.pipe(csvStream);
});
