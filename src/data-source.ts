import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'change-me',
  password: 'change-me',
  database: 'exchange',
  synchronize: false,
  logging: false,
  entities: ['src/infra/database/typeorm/entity/*.entity.ts'],
  migrations: ['src/infra/database/typeorm/migration/*.js'],
  subscribers: [],
})
