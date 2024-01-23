import express from 'express'
import { validationMiddleware } from '../infra/middleware/validate'
import { loginDto } from '../domain/dto/auth/login.dto'
import AuthController from '../application/controller/auth.controller'
import authenticationMiddleware from '../infra/middleware/authentication'
import { UserRepository } from '../infra/repository/user.repository'
import LoginUsecase from '../application/use-cases/auth/login.use-case'

export const sessionRoutes = express.Router()
const usersRepository = new UserRepository()
const loginUseCase = new LoginUsecase(usersRepository)
const authController = new AuthController(usersRepository, loginUseCase)

sessionRoutes.post(
  '/login',
  validationMiddleware(loginDto),
  authController.login
)

//TODO change authenticationMiddleware for global, routes are private by default

sessionRoutes.get('/private', authenticationMiddleware, async (req, res) => {
  res.send('authenticated')
})
