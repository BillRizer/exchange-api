import 'reflect-metadata'
import express from 'express'
import { json } from 'body-parser'
import { AppDataSource } from './data-source'
import UserController from './application/controller/user.controller'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator'
import { validationMiddleware } from './infra/middleware/validate'

export class userDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @MaxLength(4)
  @IsNumber({}, { message: 'deve ser um numero' })
  @IsNotEmpty()
  balance: number
}

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

app.post('/register', validationMiddleware(userDto), userController.register)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
