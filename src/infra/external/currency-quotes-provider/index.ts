import { MercadoBTCProvider } from './providers/mercado-btc.provider'
import { TCurrency } from '@/domain/types/currency-quote-currency.type'
import CurrencyQuote from '@/domain/currency-quote'
import { logger } from '@/infra/log'

export class CurrencyQuotesProvider {
  async fetchTicker(currency: TCurrency): Promise<CurrencyQuote | void> {
    try {
      const ticker = await new MercadoBTCProvider().fetchTicker(currency)

      if (!ticker) {
        // ticker = await OTHERProvider.fetchTicker(currency)
      }

      return new CurrencyQuote(ticker)
    } catch (error) {
      logger.logError('Error when fetch currency from external provider', error)
    }
  }
}
