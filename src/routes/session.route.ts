import express from 'express'
import { validationMiddleware } from '../infra/middleware/validate'
import { loginDto } from '../domain/dto/auth/login.dto'
import AuthController from '../application/controller/auth.controller'
import authenticationMiddleware from '../infra/middleware/authentication'

export const sessionRoutes = express.Router()
const authController = new AuthController()

sessionRoutes.post(
  '/login',
  validationMiddleware(loginDto),
  authController.login
)

//TODO change authenticationMiddleware for global, routes are private by default

sessionRoutes.get('/private', authenticationMiddleware, (req, res) => {
  res.send('authenticated')
})
