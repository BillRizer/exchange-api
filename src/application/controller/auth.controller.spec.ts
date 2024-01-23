import { Request, Response } from 'express'
import AuthController from './auth.controller'
import LoginUsecase from '../use-cases/auth/login.use-case'
import { IUserRepository } from '../../infra/repository/user.repository'
import User from '../../domain/user'
import { SuccessResponse } from '../use-cases/response-payload'
import { loginDto } from '../../domain/dto/auth/login.dto'

// Mocking the UserRepository for testing purposes
class MockUserRepository implements IUserRepository {
  findByEmail: (email: string) => Promise<User | null>
  saveUser: (user: User) => Promise<User>
}

describe('AuthController', () => {
  let authController: AuthController
  let mockUserRepository: MockUserRepository
  let mockLoginUsecase: LoginUsecase
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const mockLoginDto: loginDto = { email: 'test@example', password: 'test' }

  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockLoginUsecase = new LoginUsecase(mockUserRepository)
    authController = new AuthController(mockUserRepository, mockLoginUsecase)
    mockRequest = { body: mockLoginDto }
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  it('should handle login successfully ', async () => {
    const executeSpy = jest
      .spyOn(mockLoginUsecase, 'execute')
      .mockResolvedValue(
        new SuccessResponse({
          data: { token: 'mocked valid Token' },
        })
      )

    authController.login(mockRequest as Request, mockResponse as Response)

    expect(executeSpy).toHaveBeenCalledWith(
      mockLoginDto.email,
      mockLoginDto.password
    )
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('should handle login error', async () => {
    const wrongLogin: loginDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    }
    const executeSpy = jest
      .spyOn(mockLoginUsecase, 'execute')
      .mockRejectedValue(new Error('Authentication failed'))

    mockRequest.body = wrongLogin

    authController.login(mockRequest as Request, mockResponse as Response)

    expect(executeSpy).toHaveBeenCalledWith(
      wrongLogin.email,
      wrongLogin.password
    )
    expect(executeSpy).rejects.toThrow()
  })
})
