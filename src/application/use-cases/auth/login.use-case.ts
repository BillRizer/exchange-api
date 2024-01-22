import User from '../../../domain/user'
import { Auth } from '../../../infra/auth'
import { compare, hash } from '../../../infra/helpers/crypto'
import { IUserRepository } from '../../../repository/user.repository'

export default class LoginUsecase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  execute = async (email: string, password: string) => {
    const userExists = await this.repository.findByEmail(email)

    if (!userExists) {
      throw new Error('Incorrect Email or Password.')
    }
    const matchPasswod = compare(password, userExists.password)

    if (!matchPasswod) {
      throw new Error('Incorrect Email or Password.')
    }
    const { password: _, ...userWithoutBalance } = userExists

    return this.generateToken(userWithoutBalance)
  }

  generateToken = (user: Partial<User>): string => {
    const auth = new Auth().generateJWTToken(user)

    if (!auth) {
      throw new Error('JWT token error')
    }
    return auth
  }
}
