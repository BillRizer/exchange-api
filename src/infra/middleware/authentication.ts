import { NextFunction, Request, Response } from 'express'
import { Auth } from '@/infra/auth'

export default function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req?.headers?.authorization

  if (!authHeader) {
    throw new Error('Authorization header is missing')
  }
  try {
    const [, token] = authHeader.split(' ')
    const decoded = new Auth().verifyJWTToken(token)
    req.user = {
      id: decoded.id,
    }
    next()
  } catch (error) {
    throw new Error('JWT token verification failed')
  }
}
