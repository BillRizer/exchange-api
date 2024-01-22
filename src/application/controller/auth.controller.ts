import { Request, Response } from 'express'
import {
  IUserRepository,
  UserRepository,
} from '../../infra/repository/user.repository'
import LoginUsecase from '../use-cases/auth/login.use-case'
import { loginDto } from '../../domain/dto/auth/login.dto'

export default class AuthController {
  private usersRepository: IUserRepository

  constructor() {
    this.usersRepository = new UserRepository()
  }

  login = (req: Request, res: Response) => {
    const userCase = new LoginUsecase(this.usersRepository)
    const dto: loginDto = req.body

    userCase
      .execute(dto.email, dto.password)
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        res.status(400).send(err.message || 'Server Error')
      })
  }
}
