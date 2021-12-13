/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */

import { MongoHelper } from '../infra/db/helpers/mongo-helper';
import env from './config/env';

require('dotenv').config();

MongoHelper.connect(process.env.MONGO_URL as string)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server started at port ${env.port}`)
    );
  })
  .catch(console.error);
