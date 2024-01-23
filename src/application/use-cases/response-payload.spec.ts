import {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
  IResponsePayload,
} from './response-payload'

describe('ErrorResponse', () => {
  it('should create an instance with success set to false', () => {
    const errorResponse = new ErrorResponse({})
    expect(errorResponse.success).toBe(false)
  })

  it('should set the provided properties in the constructor', () => {
    const errorResponse = new ErrorResponse({
      errors: ['Error 1', 'Error 2'],
      message: 'Some error message',
    })

    expect(errorResponse.errors).toEqual(['Error 1', 'Error 2'])
    expect(errorResponse.message).toBe('Some error message')
  })
})

describe('SuccessResponse', () => {
  it('should create an instance with success set to true', () => {
    const successResponse = new SuccessResponse({})
    expect(successResponse.success).toBe(true)
  })

  it('should set the provided properties in the constructor', () => {
    const successResponse = new SuccessResponse({
      data: { key: 'value' },
      message: 'Operation successful',
    })

    expect(successResponse.data).toEqual({ key: 'value' })
    expect(successResponse.message).toBe('Operation successful')
  })
})
