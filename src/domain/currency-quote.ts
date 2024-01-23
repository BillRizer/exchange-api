interface CurrencyQuoteProps {
  buy: number | string
  sell: number | string
  date: Date
}

export default class CurrencyQuote {
  buy: number
  sell: number
  date: Date

  constructor(props: CurrencyQuoteProps) {
    this.buy = parseFloat(`${props.buy}`)
    this.sell = parseFloat(`${props.sell}`)
    this.date = props.date
  }
}
