import { Request, Response } from 'express'
import User from '../../domain/user'
import RegisterUsecase from '../use-cases/user/register.use-case'
import {
  IUserRepository,
  UserRepository,
} from '../../repository/user.repository'

export default class UserController {
  private usersRepository: IUserRepository

  constructor() {
    this.usersRepository = new UserRepository()
  }

  register = (req: Request, res: Response) => {
    const userCase = new RegisterUsecase(this.usersRepository)

    userCase
      .execute(new User(req.body))
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        res.status(400).send(err.message || 'Ocorreu um erro')
      })
  }
}
