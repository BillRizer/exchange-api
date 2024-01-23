import { envSchema } from 'env-schema'

interface AppConfig {
  PORT: number
  REDIS_URL: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  CRYPTO_SALT: number
}

export const schema = {
  type: 'object',
  required: [
    'PORT',
    'REDIS_URL',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'CRYPTO_SALT',
  ],
  properties: {
    PORT: {
      type: 'number',
    },
    REDIS_URL: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    JWT_EXPIRES_IN: {
      type: 'string',
    },
    CRYPTO_SALT: {
      type: 'number',
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
