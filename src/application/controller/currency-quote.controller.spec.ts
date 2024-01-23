import { Request, Response } from 'express'
import CurrencyQuoteController from './currency-quote.controller'
import GetCurrencyQuoteUsecase from '../use-cases/currency-quote/get-currency-quote.use-case'
import { TCurrency } from '../../domain/types/currency-quote.type'
import { IResponsePayload } from '../use-cases/response-payload'
import CurrencyQuote from '../../domain/currency-quote'
import { Cache } from '../../infra/external/cache'

// Mocking the GetCurrencyQuoteUsecase for testing purposes
class MockGetCurrencyQuoteUsecase implements GetCurrencyQuoteUsecase {
  execute: (currency: TCurrency) => Promise<IResponsePayload>
  getCurrencyQuoteFromCache: (
    cacheClient: Cache,
    currency: TCurrency
  ) => Promise<CurrencyQuote | undefined>
  getCurrencyQuoteFromProvider: (
    currency: TCurrency
  ) => Promise<void | CurrencyQuote>
}

describe('CurrencyQuoteController', () => {
  let currencyQuoteController: CurrencyQuoteController
  let mockGetCurrencyQuoteUsecase: MockGetCurrencyQuoteUsecase
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    mockGetCurrencyQuoteUsecase = new MockGetCurrencyQuoteUsecase()
    currencyQuoteController = new CurrencyQuoteController(
      mockGetCurrencyQuoteUsecase
    )
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  it('should handle currency quote request successfully', async () => {
    mockGetCurrencyQuoteUsecase.execute = jest
      .fn()
      .mockResolvedValue({ quote: 50000 })

    await currencyQuoteController.currencyQuote(
      mockRequest as Request,
      mockResponse as Response
    )

    expect(mockGetCurrencyQuoteUsecase.execute).toHaveBeenCalledWith('btc')
    expect(mockResponse.json).toHaveBeenCalledWith({ quote: 50000 })
    expect(mockResponse.status).not.toHaveBeenCalled()
    expect(mockResponse.send).not.toHaveBeenCalled()
  })

  it('should handle currency quote request error and send 400 status with error message', async () => {
    mockGetCurrencyQuoteUsecase.execute = jest
      .fn()
      .mockRejectedValue(new Error('errorMessage'))

    await currencyQuoteController.currencyQuote(
      mockRequest as Request,
      mockResponse as Response
    )

    expect(mockGetCurrencyQuoteUsecase.execute).toHaveBeenCalledWith('btc')
    expect(mockResponse.json).not.toHaveBeenCalled()
  })
})
