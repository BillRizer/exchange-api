import { MailtrapProvider } from './mailtrap.provider'

jest.mock('../../../config/config', () => ({
  config: {
    MAILTRAP_USER: 'testuser',
    MAILTRAP_PASS: 'testpass',
    MAILTRAP_FROM: 'from@example.com',
    MAILTRAP_MAX_ATTEMPTS: 2,
    MAILTRAP_DELAY: 100,
  },
}))

jest.mock('../../../infra/logger', () => ({
  logger: {
    logInfo: jest.fn(),
    logError: jest.fn(),
  },
}))

describe('MailtrapProvider', () => {
  test('should send an email successfully', async () => {
    const mailtrapProvider = new MailtrapProvider()
    const spySendMail = jest
      .spyOn(mailtrapProvider, 'sendEmail')
      .mockResolvedValue()

    await mailtrapProvider.sendEmail(
      'test@example.com',
      'Test Subject',
      'Test Body'
    )

    expect(spySendMail).toHaveBeenCalled()
  })

  test('should log an error and throw an error after max attempts', async () => {
    const mailtrapProvider = new MailtrapProvider()

    const spyLogError = jest
      .spyOn(mailtrapProvider, 'sendEmail')
      .mockRejectedValueOnce('error')

    const req = mailtrapProvider.sendEmail(
      'test@example.com',
      'Test Subject',
      'Test Body'
    )
    await expect(req).rejects.toEqual('error')
    expect(spyLogError).toHaveBeenCalled()
  })
})
