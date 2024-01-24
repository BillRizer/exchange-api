import { config } from '../../../config/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  username: config.PG_USER,
  password: config.PG_PASS,
  database: config.PG_DB,
  host: config.PG_HOST,
  port: config.PG_PORT,
  synchronize: false,
  logging: false,
  entities: ['src/infra/database/typeorm/entity/*.entity.ts'],
  migrations: ['src/infra/database/typeorm/migration/*.js'],
  subscribers: [],
})
