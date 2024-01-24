import CurrencyQuote from './currency-quote'

describe('CurrencyQuote', () => {
  test('should create a CurrencyQuote instance with correct values', () => {
    const props = {
      buy: 1.2345,
      sell: 1.234,
      date: new Date('2024-01-23'),
    }

    const currencyQuote = new CurrencyQuote(props)

    expect(currencyQuote).toBeInstanceOf(CurrencyQuote)
    expect(currencyQuote.buy).toBe(1.2345)
    expect(currencyQuote.sell).toBe(1.234)
    expect(currencyQuote.date).toEqual(new Date('2024-01-23'))
  })

  test('should parse string values to numbers during instantiation', () => {
    const props = {
      buy: '1.2345',
      sell: '1.234',
      date: new Date('2024-01-23'),
    }

    const currencyQuote = new CurrencyQuote(props)

    expect(currencyQuote.buy).toBe(1.2345)
    expect(currencyQuote.sell).toBe(1.234)
  })

  test('should handle invalid date during instantiation', () => {
    const props: CurrencyQuote = {
      buy: 1.2345,
      sell: 1.234,
      date: 'invalid date' as any,
    }

    expect(() => new CurrencyQuote(props)).toThrow()
  })
})
