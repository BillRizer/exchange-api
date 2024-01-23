import { envSchema } from 'env-schema'

interface AppConfig {
  PORT: number
  REDIS_URL: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  CRYPTO_SALT: number
  AMQP_URL: string
  MAILTRAP_USER: string
  MAILTRAP_PASS: string
  MAILTRAP_MAX_ATTEMPTS: number
  MAILTRAP_DELAY: number
  MAILTRAP_FROM: string
}

export const schema = {
  type: 'object',
  required: [
    'PORT',
    'REDIS_URL',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'CRYPTO_SALT',
    'AMQP_URL',
    'MAILTRAP_USER',
    'MAILTRAP_PASS',
    'MAILTRAP_MAX_ATTEMPTS',
    'MAILTRAP_DELAY',
    'MAILTRAP_FROM',
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
    AMQP_URL: {
      type: 'string',
    },
    MAILTRAP_USER: {
      type: 'string',
    },
    MAILTRAP_PASS: {
      type: 'string',
    },
    MAILTRAP_MAX_ATTEMPTS: {
      type: 'number',
    },
    MAILTRAP_DELAY: {
      type: 'number',
    },
    MAILTRAP_FROM: {
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
