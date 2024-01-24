import User from '@/domain/user'
import { hash } from '../../../infra/helpers/crypto'
import { IUserRepository } from '@/infra/repository/user.repository'
import {
  ErrorResponse,
  IResponsePayload,
  SuccessResponse,
} from '../response-payload'

export default class RegisterUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (user: User): Promise<IResponsePayload> => {
    const passHashed = hash(user.password)
    const userExists = await this.repository.findByEmail(user.email)
    if (userExists) {
      return new ErrorResponse({
        errors: `User email ${user.email} already exists`,
      })
    }

    const userCreated = await this.repository.saveUser({
      ...user,
      password: passHashed,
    })

    return new SuccessResponse({ data: userCreated })
  }
}
