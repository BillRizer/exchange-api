import { envSchema } from 'env-schema'

interface AppConfig {
  PORT: number
  REDIS_URL: string
}

export const schema = {
  type: 'object',
  required: ['PORT', 'REDIS_URL'],
  properties: {
    PORT: {
      type: 'number',
    },
    REDIS_URL: {
      type: 'string',
    },
  },
}
class ConfigValitador {
  public config: any
  constructor() {
    this.config = envSchema({
      schema: schema,
      data: process.env,
      dotenv: true,
      // you can pass DotenvConfigOptions
      // dotenv: {
      //   path: '/custom/path/to/.env'
      // }
    })
  }
}
export const config = new ConfigValitador().config as AppConfig
