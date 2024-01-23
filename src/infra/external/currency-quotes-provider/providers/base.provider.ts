import { TCurrency } from '../../../../domain/types/currency-quote.type'
import { ITicker } from '../resources.interface'

export interface IBaseProvider {
  fetchTicker(currency: TCurrency): Promise<ITicker>
}
