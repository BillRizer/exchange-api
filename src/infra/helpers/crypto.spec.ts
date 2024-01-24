import { generateSalt, compare, hash } from './crypto'

describe('Crypto', () => {
  describe('generateSalt', () => {
    test('should generate a salt string', () => {
      const salt = generateSalt()
      expect(salt).toEqual(expect.any(String))
    })
  })

  describe('compare', () => {
    const originalData = 'password'
    const encryptedData = hash(originalData)

    test('should return true for matching data', () => {
      const result = compare(originalData, encryptedData)
      expect(result).toBe(true)
    })

    test('should return false for non-matching data', () => {
      const result = compare('wrongpassword', encryptedData)
      expect(result).toBe(false)
    })
  })

  describe('hash', () => {
    test('should generate a hashed password', () => {
      const originalData = 'password'
      const hashedPassword = hash(originalData)
      expect(hashedPassword).toEqual(expect.any(String))
    })
  })
})
