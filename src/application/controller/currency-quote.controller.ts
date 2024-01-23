import { Request, Response } from 'express'
import GetCurrencyQuoteUsecase from '@UseCases/currency-quote/get-currency-quote.use-case'

export default class CurrencyQuoteController {
  private useCase: GetCurrencyQuoteUsecase

  constructor(usecase: GetCurrencyQuoteUsecase) {
    this.useCase = usecase
  }

  currencyQuote = (req: Request, res: Response) => {
    this.useCase
      .execute('btc')
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        res.status(400).send(err.message || 'Server Error')
      })
  }
}
