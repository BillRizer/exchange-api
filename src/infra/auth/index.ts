import { JwtPayload, sign, verify } from 'jsonwebtoken'
import User from '@/domain/user'
import { config } from '../../config/config'

export interface ITokenPayload {
  iat: number
  exp: number
  id: number
}
export interface IAuth {
  generateJWTToken: (user: Partial<User>) => string
}

export class Auth implements IAuth {
  public generateJWTToken(user: Partial<User>): string {
    const expiresIn = config.JWT_EXPIRES_IN
    const secret = config.JWT_SECRET

    return sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn }
    )
  }

  public verifyJWTToken(token: string): ITokenPayload {
    const decoded = verify(token, config.JWT_SECRET)
    const { exp, iat, id } = decoded as ITokenPayload
    return <ITokenPayload>{ exp, iat, id }
  }
}
