import 'reflect-metadata'
import express from 'express'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import UserController from './application/controller/user.controller'

import { validationMiddleware } from './infra/middleware/validate'
import AuthController from './application/controller/auth.controller'
import { createUserDto } from './infra/dto/user/create-user.dto'
import { loginDto } from './infra/dto/auth/login.dto'
import ErrorMiddleware from './infra/middleware/error.middleware'

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
const authController = new AuthController()

app.post(
  '/register',
  validationMiddleware(createUserDto),
  userController.register
)
app.post('/login', validationMiddleware(loginDto), authController.login)
app.use(ErrorMiddleware)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
