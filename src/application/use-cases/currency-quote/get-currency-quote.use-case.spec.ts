import GetCurrencyQuoteUsecase from './get-currency-quote.use-case'
import { Cache } from '../../../infra/external/cache'
import { CurrencyQuotesProvider } from '../../../infra/external/currency-quotes-provider'
import { SuccessResponse } from '../response-payload'

jest.mock('../../../infra/external/cache', () => {
  return {
    Cache: jest.fn().mockImplementation(() => ({
      getDataFromCache: jest.fn(),
      setCacheData: jest.fn(),
    })),
  }
})

jest.mock('../../../infra/external/currency-quotes-provider', () => {
  return {
    CurrencyQuotesProvider: jest.fn().mockImplementation(() => ({
      fetchTicker: jest.fn(),
    })),
  }
})

describe('GetCurrencyQuoteUsecase', () => {
  let getCurrencyQuoteUsecase: GetCurrencyQuoteUsecase
  let mockCache: jest.Mocked<Cache>
  let mockProvider: jest.Mocked<CurrencyQuotesProvider>

  beforeEach(() => {
    mockCache = new Cache(null) as jest.Mocked<Cache>
    mockProvider =
      new CurrencyQuotesProvider() as jest.Mocked<CurrencyQuotesProvider>
    getCurrencyQuoteUsecase = new GetCurrencyQuoteUsecase(
      mockProvider,
      mockCache
    )
  })

  it('should retrieve currency quote from cache successfully', async () => {
    const mockCurrencyQuote = {}
    mockCache.getDataFromCache.mockResolvedValue(mockCurrencyQuote)

    const result = await getCurrencyQuoteUsecase.execute('btc')

    expect(result).toBeInstanceOf(SuccessResponse)
    expect(result.data).toEqual(mockCurrencyQuote)
    expect(mockProvider.fetchTicker).not.toHaveBeenCalled()
    expect(mockCache.setCacheData).not.toHaveBeenCalled()
  })

  it('should retrieve currency quote from provider and update cache successfully', async () => {
    const mockCurrencyQuote = {}
    mockProvider.fetchTicker.mockResolvedValue(mockCurrencyQuote)
    mockCache.getDataFromCache.mockResolvedValue(undefined)

    const result = await getCurrencyQuoteUsecase.execute('btc')

    expect(result).toBeInstanceOf(SuccessResponse)
    expect(result.data).toEqual(mockCurrencyQuote)
    expect(mockProvider.fetchTicker).toHaveBeenCalledWith('btc')
    expect(mockCache.setCacheData).toHaveBeenCalledWith(
      'btc',
      mockCurrencyQuote,
      expect.any(Number)
    )
  })
})
