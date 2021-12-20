/* eslint-disable import-helpers/order-imports */
import { RedisHelper } from '../infra/cache/helpers/redis-helper';
import { MongoHelper } from '../infra/db/helpers/mongo-helper';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */

import env from './config/env';

require('dotenv').config();

export const cache = new RedisHelper({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: +process.env.REDIS_PORT,
  timeExp: 60 * 15,
});

MongoHelper.connect(process.env.MONGO_URL as string)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server started at port ${env.port}`)
    );
  })
  .catch(console.error);
