import { createClient, RedisClientType } from 'redis'
import { IBaseCacheClient } from './base-cache.interface'
import { config } from '@/config/config'
import { logger } from '@/infra/log'

class RedisClient implements IBaseCacheClient {
  private client: RedisClientType

  constructor() {
    this.client = createClient({
      url: config.REDIS_URL,
    })
    this.client.connect()

    this.client.on('error', (err) => {
      logger.logError('REDIS error', err)
    })
  }

  async set(key: string, value: string, ttl?: number): Promise<string | void> {
    if (!ttl) {
      await this.client.set(key, value)
    } else {
      await this.client.setEx(key, ttl, value)
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key)
  }

  quit(): void {
    this.client.quit()
  }
}

export default RedisClient
