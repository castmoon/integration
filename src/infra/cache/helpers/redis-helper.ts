import Redis from 'ioredis';

import { ICache } from '../../../data/protocols/cache';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

interface IRedisConfig {
  host: string;
  password: string;
  port: number;
  timeExp: number;
}

export class RedisHelper implements ICache {
  private redis: any;
  constructor(private readonly redisConfig: IRedisConfig) {
    this.redis = new Redis({
      host: redisConfig.host,
      password: redisConfig.password,
      port: redisConfig.port,
    });
  }
  set(key: string, value: string) {
    return this.redis.set(
      key,
      JSON.stringify(value),
      'EX',
      this.redisConfig.timeExp
    );
  }
  async get(key: string): Promise<any> {
    const response = await this.redis.get(key);
    return response ? JSON.parse(response) : null;
  }
}
