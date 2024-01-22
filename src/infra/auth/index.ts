import { JwtPayload, sign, verify } from 'jsonwebtoken'
import User from '../../domain/user'

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
    const expiresIn = '1d'
    const secret = 'secret'

    return sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn }
    )
  }

  public verifyJWTToken(token: string): ITokenPayload {
    const secret = 'secret'

    const decoded = verify(token, secret)
    const { exp, iat, id } = decoded as ITokenPayload
    return <ITokenPayload>{ exp, iat, id }
  }
}
