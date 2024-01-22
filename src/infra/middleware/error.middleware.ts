import { NextFunction, Request, Response } from 'express'

const ErrorMiddleware = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Middleware Error Hadnling')
  const errStatus = err.statusCode || 500
  const errMsg = err.message || 'Something went wrong'
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
}

export default ErrorMiddleware
