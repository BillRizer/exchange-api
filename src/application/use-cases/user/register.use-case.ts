import User from '@/domain/user'
import { hash } from '../../../infra/helpers/crypto'
import { IUserRepository } from '@/infra/repository/user.repository'
import { IResponsePayload, SuccessResponse } from '../response-payload'

export default class RegisterUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (user: User): Promise<IResponsePayload> => {
    const passHashed = hash(user.password)

    const userCreated = await this.repository.saveUser({
      ...user,
      password: passHashed,
    })

    return new SuccessResponse({ data: userCreated })
  }
}
