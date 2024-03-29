import { Request, Response } from 'express'
import {
  IUserRepository,
  UserRepository,
} from '@/infra/repository/user.repository'
import LoginUsecase from '@/application/use-cases/auth/login.use-case'
import { loginDto } from '@/domain/dto/auth/login.dto'

export default class AuthController {
  private useCase: LoginUsecase

  constructor(usersRepository: IUserRepository, usecase: LoginUsecase) {
    this.useCase = usecase
  }

  login = (req: Request, res: Response) => {
    const dto: loginDto = req.body

    this.useCase
      .execute(dto.email, dto.password)
      .then((response) => {
        if (!response.success) {
          res.status(401).json(response).send()
          return
        }
        res.json(response)
      })
      .catch((err) => {
        res.status(400).send(err.message || 'Server Error')
      })
  }
}
