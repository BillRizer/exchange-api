import express, { Response } from 'express'
import { sessionRoutes } from './session.route'
import { userRoutes } from './user.route'

export const routes = express.Router()

routes.use(sessionRoutes)

routes.use(userRoutes)
