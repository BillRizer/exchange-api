import User from '../../../domain/user'
import { IUserRepository } from '../../../repository/user.repository'

export default class LoginUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (email: string, password: string) => {
    const userExists = await this.repository.findByEmail(email)

    if (!userExists) {
      throw new Error('Wrong Email or Password')
    }
  }
}
