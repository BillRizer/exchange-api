import express, { Response } from 'express'
import { sessionRoutes } from './session.route'
import { userRoutes } from './user.route'
import { currencyQuoteRoutes } from './current-quote.route'
import { depositRoutes } from './deposit.route'

export const routes = express.Router()

routes.use(sessionRoutes)

routes.use(userRoutes)

routes.use(currencyQuoteRoutes)

routes.use(depositRoutes)
