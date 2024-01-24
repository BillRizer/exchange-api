import authenticationMiddleware from './authentication'
import { Auth } from '../../infra/auth'

// Mock de funções e objetos necessários
jest.mock('../../infra/auth', () => ({
  Auth: jest.fn().mockImplementation(() => ({
    verifyJWTToken: jest.fn().mockReturnValue({ id: 'mockedUserId' }),
  })),
}))

describe('Authentication Middleware', () => {
  const mockRequest = (token: string) => ({
    headers: { authorization: token },
    user: {},
  })

  const mockResponse = () => ({
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  })

  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should set req.user with decoded id on valid token', () => {
    const token = 'Bearer validToken'
    const req = mockRequest(token)
    const res = mockResponse()

    authenticationMiddleware(req, res, mockNext)

    expect(req.user).toEqual({ id: 'mockedUserId' })
    expect(mockNext).toHaveBeenCalled()
  })

  test('should throw an error for missing authorization header', () => {
    const req = mockRequest(undefined)
    const res = mockResponse()

    expect(() => authenticationMiddleware(req, res, mockNext)).toThrow(
      'Authorization header is missing'
    )
    expect(mockNext).not.toHaveBeenCalled()
  })

  test('should throw an error for invalid JWT token', () => {
    const token = 'Bearer invalidToken'
    const req = mockRequest(token)
    const res = mockResponse()

    // Mockando uma verificação de token inválida
    Auth.mockImplementationOnce(() => ({
      verifyJWTToken: jest.fn().mockImplementation(() => {
        throw new Error('Invalid token')
      }),
    }))

    expect(() => authenticationMiddleware(req, res, mockNext)).toThrow(
      'JWT token verification failed'
    )
    expect(mockNext).not.toHaveBeenCalled()
  })
})
