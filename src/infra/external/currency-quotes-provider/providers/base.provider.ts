import { TCurrency } from '@/domain/types/currency-quote-currency.type'
import { ITicker } from '@/domain/interfaces/currency-quote-ticker.interface'

export interface IBaseProvider {
  fetchTicker(currency: TCurrency): Promise<ITicker>
}
