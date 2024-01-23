import User from '@/domain/user'
import { Auth } from '../../../infra/auth'
import { compare } from '../../../infra/helpers/crypto'
import { IUserRepository } from '@/infra/repository/user.repository'
import {
  ErrorResponse,
  IResponsePayload,
  SuccessResponse,
} from '../response-payload'

export default class LoginUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (
    email: string,
    password: string
  ): Promise<IResponsePayload> => {
    const userExists = await this.repository.findByEmail(email)

    if (!userExists) {
      return new ErrorResponse({
        errors: 'Incorrect Email or Password.',
      })
    }
    const matchPasswod = compare(password, userExists.password)

    if (!matchPasswod) {
      return new ErrorResponse({
        errors: 'Incorrect Email or Password.',
      })
    }
    const { password: _, ...userWithoutBalance } = userExists

    return new SuccessResponse({
      data: { token: this.generateToken(userWithoutBalance) },
    })
  }

  generateToken = (user: Partial<User>): string => {
    const auth = new Auth().generateJWTToken(user)

    if (!auth) {
      throw new Error('JWT token error')
    }
    return auth
  }
}
