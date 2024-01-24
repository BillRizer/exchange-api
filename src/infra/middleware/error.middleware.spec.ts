import ErrorMiddleware from './error.middleware'

describe('Error Middleware', () => {
  const mockRequest: any = {}
  const mockResponse = () => ({
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  })
  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should handle an error with status code and message', () => {
    const err: any = new Error('Custom error message')
    err.statusCode = 404

    const res: any = mockResponse()

    ErrorMiddleware(err, mockRequest, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status: 404,
      message: 'Custom error message',
      stack: {},
    })
  })

  test('should handle an error without status code and default message', () => {
    const err = new Error()

    const res: any = mockResponse()

    ErrorMiddleware(err, mockRequest, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status: 500,
      message: 'Something went wrong',
      stack: {},
    })
  })

  test('should handle an error with status code, message, and stack in development mode', () => {
    const err: any = new Error('Custom error message')
    err.statusCode = 404
    process.env.NODE_ENV = 'development'

    const res: any = mockResponse()

    ErrorMiddleware(err, mockRequest, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status: 404,
      message: 'Custom error message',
      stack: expect.anything(),
    })

    // Reset NODE_ENV after the test
    process.env.NODE_ENV = 'test'
  })

  test('should handle an error without status code and with stack in development mode', () => {
    const err = new Error()
    process.env.NODE_ENV = 'development'

    const res: any = mockResponse()

    ErrorMiddleware(err, mockRequest, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      status: 500,
      message: 'Something went wrong',
      stack: expect.anything(),
    })

    // Reset NODE_ENV after the test
    process.env.NODE_ENV = 'test'
  })
})
