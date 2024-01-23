// register.usecase.test.ts

import RegisterUsecase from './register.use-case'
import User from '../../../domain/user'
import { IResponsePayload, SuccessResponse } from '../response-payload'
import { IUserRepository } from '@/infra/repository/user.repository'

// Mock para IUserRepository
const userRepositoryMock: jest.Mocked<IUserRepository> = {
  saveUser: jest.fn(),
  findByEmail: jest.fn(),
}
const mockedUser = new User({
  id: 1,
  name: 'nameuser',
  email: 'testuser',
  password: 'testpassword',
})
describe('RegisterUsecase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should save a new user and return a SuccessResponse', async () => {
    const registerUsecase = new RegisterUsecase(userRepositoryMock)
    const user = mockedUser
    jest.spyOn(userRepositoryMock, 'saveUser').mockResolvedValue({
      id: 1,
      ...user,
    })

    const result: IResponsePayload = await registerUsecase.execute(user)

    expect(userRepositoryMock.saveUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: user.name,
        password: expect.any(String),
      })
    )
    expect(result).toBeInstanceOf(SuccessResponse)
    expect(result.success).toEqual(true)
    expect(result.errors).toEqual(undefined)
    expect(result.message).toEqual(undefined)
    expect(result.data).toEqual(
      expect.objectContaining({
        id: 1,
        ...user,
      })
    )
  })
})
