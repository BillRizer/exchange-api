import { Auth, ITokenPayload } from './index'
import { sign, verify } from 'jsonwebtoken'
import { config } from '../../config/config'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}))

describe('Auth', () => {
  const mockUser = { id: 123 }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generateJWTToken should call sign with correct parameters', () => {
    const auth = new Auth()
    auth.generateJWTToken(mockUser)

    expect(sign).toHaveBeenCalledWith({ id: mockUser.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    })
  })

  test('verifyJWTToken should return the decoded payload', () => {
    const auth = new Auth()
    const mockToken = 'mockedToken'
    const mockDecoded: ITokenPayload = { exp: 123, iat: 456, id: 789 }

    // Mockando a função verify para retornar o payload decodificado
    verify.mockReturnValueOnce(mockDecoded)

    const result = auth.verifyJWTToken(mockToken)

    expect(result).toEqual(mockDecoded)
  })

  test('verifyJWTToken should throw an error for invalid token', () => {
    const auth = new Auth()
    const mockToken = 'invalidToken'

    // Mockando a função verify para lançar um erro
    verify.mockImplementation(() => {
      throw new Error('Invalid token')
    })

    expect(() => auth.verifyJWTToken(mockToken)).toThrow('Invalid token')
  })
})
