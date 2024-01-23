import { createClient, RedisClientType } from 'redis'

export interface ICacheClient {
  set(key: string, value: string, ttl?: number): Promise<string | void>
  get(key: string): Promise<string | null>
  quit(): void
}
class RedisClient implements ICacheClient {
  private client: RedisClientType

  constructor() {
    this.client = createClient({
      url: 'redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@172.19.0.2:6379',
    })
    this.client.connect()

    this.client.on('error', (err) => {
      console.error('Erro de conexão com o Redis:', err)
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
