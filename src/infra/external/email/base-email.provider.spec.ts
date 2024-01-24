import { EmailSender } from './base-emai.provider'
import { IEmail } from './email.factory'

class MockEmailProvider {
  async sendEmail(to, subject, body) {
    jest.fn()
  }
}
class ErrorMockEmailProvider {
  async sendEmail(to, subject, body) {
    throw new Error('error during email sending')
  }
}
describe('EmailSender', () => {
  test('should send an email using the provided email provider', async () => {
    const emailSender = new EmailSender(new MockEmailProvider())
    const spySendEmail = jest.spyOn(emailSender, 'sendEmail')

    const testEmail: IEmail = {
      to: 'test@example.com',
      subject: 'Test Subject',
      template: 'default',
      body: 'Test Body',
    }

    await emailSender.sendEmail(testEmail)

    expect(spySendEmail).toHaveBeenCalledWith(testEmail)
  })
})
