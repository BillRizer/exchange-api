import 'reflect-metadata'
import express from 'express'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import UserController from './application/controller/user.controller'

const app = express()
const port = 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(json())

const userController = new UserController()

app.post('/register', userController.register)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
