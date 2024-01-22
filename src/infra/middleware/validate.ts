import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

export const validationPipe = async <T>(
  schema: new () => T,
  requestObject: Record<string, any>
): Promise<ValidationError[] | true> => {
  const transformedClass = plainToClass(schema, requestObject)
  const errors: ValidationError[] = await validate(transformedClass as any)

  if (errors.length > 0) {
    return errors
  }

  return true
}

export const validationMiddleware =
  <T>(validationSchema: new () => T) =>
  async (
    req: Request,
    res: Response<{ success: boolean; errors?: string[] }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await validationPipe(validationSchema, {
        ...req.body,
        ...req.params,
      })

      if (result === true) {
        next()
      } else {
        const errorMessages = (result as ValidationError[])
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .reduce((acc, val) => acc.concat(val), []) as string[]

        res.status(400).json({
          success: false,
          errors: errorMessages,
        })
      }
    } catch (error) {
      // Handle unexpected errors
      console.error(error)
      res.status(500).json({
        success: false,
        errors: ['Internal Server Error'],
      })
    }
  }
