import { validationMiddleware, validationPipe } from './validate'

class TestSchema {
  username: string

  constructor(username: string) {
    this.username = username
  }
}

describe('Validation Middleware', () => {
  const mockRequest = (body: any) => ({
    body,
    params: {},
  })

  const mockResponse = () => ({
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  })

  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should pass validation for a valid request', async () => {
    const req: any = mockRequest({ username: 'validUsername' })
    const res: any = mockResponse()

    const middleware = validationMiddleware(TestSchema)
    await middleware(req, res, mockNext)

    expect(mockNext).toHaveBeenCalled()
  })
})
