import axios from 'axios'
import { MercadoBTCProvider } from './providers/mercado-btc.provider'
import { TCurrency } from '../../../domain/types/currency-quote-currency.type'
import { ITicker } from '../../../domain/interfaces/currency-quote-ticker.interface'
import CurrencyQuote from '../../../domain/currency-quote'

export class CurrencyQuotesProvider {
  async fetchTicker(currency: TCurrency): Promise<CurrencyQuote | void> {
    try {
      const ticker = await new MercadoBTCProvider().fetchTicker(currency)

      if (!ticker) {
        // ticker = await OTHERProvider.fetchTicker(currency)
      }

      return new CurrencyQuote(ticker)
    } catch (error) {
      console.log(error)
    }
  }
}
