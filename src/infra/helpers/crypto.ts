import { config } from '../../config/config'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'

export const generateSalt = (): string => {
  return genSaltSync(config.CRYPTO_SALT)
}

export function compare(data: string | Buffer, encrypted: string): boolean {
  return compareSync(data, encrypted)
}

export function hash(data: string | Buffer): string {
  const password = hashSync(data, generateSalt())
  return password
}
