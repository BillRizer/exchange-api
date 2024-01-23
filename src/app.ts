import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import ErrorMiddleware from './infra/middleware/error.middleware'
import { routes } from './routes'

export const app = express()
const port = 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(json())

app.use('/', routes)

app.use(ErrorMiddleware)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
