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

    if (isNaN(this.buy) || isNaN(this.sell)) {
      throw new Error('Invalid buy or sell value')
    }

    if (!(props.date instanceof Date && !isNaN(props.date.getTime()))) {
      throw new Error('Invalid date')
    }

    this.date = props.date
  }
}
