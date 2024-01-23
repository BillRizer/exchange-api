import CurrencyQuote from '../../../domain/currency-quote'
import { TCurrency } from '../../../domain/types/currency-quote.type'
import { Cache } from '../../../infra/external/cache'
import { CurrencyQuotesProvider } from '../../../infra/external/currency-quotes-provider'
import {
  ErrorResponse,
  IResponsePayload,
  SuccessResponse,
} from '../response-payload'

export default class GetCurrencyQuoteUsecase {
  private currencyQuotesProvider: CurrencyQuotesProvider
  private cacheClient: Cache

  constructor(
    currencyQuotesProvider: CurrencyQuotesProvider,
    cacheClient: Cache
  ) {
    this.currencyQuotesProvider = currencyQuotesProvider
    this.cacheClient = cacheClient
  }

  execute = async (currency: TCurrency): Promise<IResponsePayload> => {
    const CACHE_TTL = 900

    let currencyQuote = await this.getCurrencyQuoteFromCache(currency)

    if (!currencyQuote) {
      console.log('nao existe, buscando')
      const fromProvider = await this.getCurrencyQuoteFromProvider(currency)
      if (!fromProvider) {
        return new ErrorResponse({
          errors: 'Error when searching for currency quote',
        })
      }
      await this.cacheClient.setCacheData(currency, fromProvider, CACHE_TTL)
      currencyQuote = fromProvider

      console.log('nao existe, atualizando')
    }

    return new SuccessResponse({ data: currencyQuote })
  }

  getCurrencyQuoteFromCache = async (
    currency: TCurrency
  ): Promise<CurrencyQuote | undefined> => {
    return await this.cacheClient.getDataFromCache<CurrencyQuote>(currency)
  }

  getCurrencyQuoteFromProvider = async (
    currency: TCurrency
  ): Promise<CurrencyQuote | void> => {
    return await this.currencyQuotesProvider.fetchTicker(currency)
  }
}
