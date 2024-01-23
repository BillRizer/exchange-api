import express from 'express'
import CurrencyQuoteController from '@/application/controller/currency-quote.controller'
import GetCurrencyQuoteUsecase from '@/application/use-cases/currency-quote/get-currency-quote.use-case'
import RedisClient from '@/infra/external/cache/redis-client'
import { Cache } from '@/infra/external/cache'
import { CurrencyQuotesProvider } from '@/infra/external/currency-quotes-provider'

export const currencyQuoteRoutes = express.Router()

const redisClient = new RedisClient()
const cacheClient = new Cache(redisClient)
const currencyQuotesProvider = new CurrencyQuotesProvider()
const getCurrencyQuoteUsecase = new GetCurrencyQuoteUsecase(
  currencyQuotesProvider,
  cacheClient
)

const currencyQuoteController = new CurrencyQuoteController(
  getCurrencyQuoteUsecase
)

currencyQuoteRoutes.get(
  '/currency-quote',
  currencyQuoteController.currencyQuote
)
