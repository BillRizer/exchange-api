import User from '../../domain/user'
import { IUserRepository } from '../../repos/user.repository'

export default class RegisterUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (user: User) => {
    return this.repository.saveUser(user)
  }
}
