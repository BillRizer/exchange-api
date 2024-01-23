import axios from 'axios'
import { TCurrency } from '../../../../domain/types/currency-quote-currency.type'
import { ITicker } from '../../../../domain/interfaces/currency-quote-ticker.interface'
import { IBaseProvider } from './base.provider'

export class MercadoBTCProvider implements IBaseProvider {
  async fetchTicker(currency: TCurrency): Promise<ITicker> {
    const response = await axios.get(
      `https://www.mercadobitcoin.net/api/${currency}/ticker/`
    )
    if (!response?.data?.ticker) {
      throw new Error('fetching ticker error [mercadobitcoin]')
    }
    const ticker: ITicker = response?.data?.ticker
    if (ticker.date) {
      const timestampInMilliseconds = +ticker.date * 1000
      ticker.date = new Date(timestampInMilliseconds)
    }

    return ticker
  }
}
