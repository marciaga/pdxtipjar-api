import Hapi from '@hapi/hapi';
import Glue from '@hapi/glue';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import buildManifest from './manifest.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = { relativeTo: __dirname };
const manifest = buildManifest({});

const init = async () => {
  const server = await Glue.compose(manifest, options);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
