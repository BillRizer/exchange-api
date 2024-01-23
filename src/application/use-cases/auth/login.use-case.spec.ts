import User from '../../../domain/user'
import { compare } from '../../../infra/helpers/crypto'
import { IUserRepository } from '@/infra/repository/user.repository'
import {
  ErrorResponse,
  IResponsePayload,
  SuccessResponse,
} from '../response-payload'
import LoginUsecase from './login.use-case'

const userRepositoryMock: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  saveUser: jest.fn(),
}

jest.mock('../../../infra/auth', () => ({
  Auth: jest.fn().mockImplementation(() => ({
    generateJWTToken: jest.fn().mockReturnValue('mockedJWTToken'),
  })),
}))

jest.mock('../../../infra/helpers/crypto', () => ({
  compare: jest.fn(),
}))

describe('LoginUsecase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockedUser = new User({
    id: 1,
    name: 'nameuser',
    email: 'testuser',
    password: 'testpassword',
  })

  it('should return a SuccessResponse with JWT token on successful login', async () => {
    const loginUsecase = new LoginUsecase(userRepositoryMock)
    const user = mockedUser

    userRepositoryMock.findByEmail.mockResolvedValueOnce(user)
    compare.mockReturnValueOnce(true)

    const result: IResponsePayload = await loginUsecase.execute(
      user.email,
      user.password
    )

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(user.email)
    expect(compare).toHaveBeenCalledWith(user.password, user.password)
    expect(result).toBeInstanceOf(SuccessResponse)
    expect(result.data).toEqual({ token: 'mockedJWTToken' })
  })

  it('should return an ErrorResponse when user does not exist', async () => {
    const loginUsecase = new LoginUsecase(userRepositoryMock)
    const user: User = mockedUser

    userRepositoryMock.findByEmail.mockResolvedValueOnce(null)

    const result: IResponsePayload = await loginUsecase.execute(
      user.email,
      user.password
    )

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(user.email)
    expect(result).toBeInstanceOf(ErrorResponse)
    expect(result.errors).toEqual('Incorrect Email or Password.')
  })

  it('should return an ErrorResponse when password does not match', async () => {
    const loginUsecase = new LoginUsecase(userRepositoryMock)
    const user: User = mockedUser

    userRepositoryMock.findByEmail.mockResolvedValueOnce(user)
    compare.mockReturnValueOnce(false)

    const result: IResponsePayload = await loginUsecase.execute(
      user.email,
      'incorrectpassword'
    )

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(user.email)
    expect(compare).toHaveBeenCalledWith('incorrectpassword', user.password)
    expect(result).toBeInstanceOf(ErrorResponse)
    expect(result.errors).toEqual('Incorrect Email or Password.')
  })
})
