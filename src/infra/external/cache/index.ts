import { ICacheClient } from './redis-client'

export class Cache {
  constructor(private cacheProvider: ICacheClient) {}

  async getDataFromCache<T>(key: string): Promise<T | undefined> {
    const data = await this.cacheProvider.get(key)

    if (data) {
      const parsed = JSON.parse(data)
      return <T>{ ...parsed }
    }
  }

  async setCacheData<T>(key: string, payload: T, ttl?: number): Promise<void> {
    const data = JSON.stringify(payload)
    if (!data) {
      throw new Error(`cache-client: Invalid payload to key ${key}`)
    }
    await this.cacheProvider.set(key, data, ttl)
  }
}
