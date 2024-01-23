import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import { json } from 'body-parser'
import { AppDataSource } from '@/infra/database/typeorm/data-source'
import ErrorMiddleware from '@/infra/middleware/error.middleware'
import { routes } from '@/routes'
import { config } from '@/config/config'
import {
  EmailQueueWrapper,
  defaultEmailQueueConfig,
} from './infra/external/queue/email'
import { logger } from './infra/log'

dotenv.config()

export const app = express()

AppDataSource.initialize()
  .then(() => {
    logger.logDebug('Data Source has been initialized!')
  })
  .catch((error) => {
    logger.logError('Error during Data Source initialization:', error)
  })

app.use(json())

app.use('/', routes)

app.use(ErrorMiddleware)

app.listen(config.PORT, () => {
  logger.logDebug(`Server started at http://localhost:${config.PORT}`)
})

const emailQueue = new EmailQueueWrapper(defaultEmailQueueConfig)
;(async () => {
  await emailQueue.initialize()

  await emailQueue.consume()

  process.on('SIGINT', async () => {
    await emailQueue.closeConnection()
    process.exit(0)
  })
})()
