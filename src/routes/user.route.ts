import express from 'express'
import { validationMiddleware } from '../infra/middleware/validate'
import { createUserDto } from '../domain/dto/user/create-user.dto'
import UserController from '../application/controller/user.controller'

export const userRoutes = express.Router()
const userController = new UserController()
userRoutes.post(
  '/register',
  validationMiddleware(createUserDto),
  userController.register
)
