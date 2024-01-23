export interface IBaseCacheClient {
  set(key: string, value: string, ttl?: number): Promise<string | void>
  get(key: string): Promise<string | null>
  quit(): void
}
