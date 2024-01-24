import { logger } from '../../../infra/logger'
import { EmailFactory, IEmail } from './email.factory'

describe('EmailFactory', () => {
  test('should create an email instance from valid input string', () => {
    const inputString =
      '{"to": "test@example.com", "subject": "Test Subject", "template": "default", "body": "Test Body"}'
    const email = EmailFactory.createEmail(inputString)
    expect(email).toEqual(expect.any(Object))
    expect(email.to).toBe('test@example.com')
    expect(email.subject).toBe('Test Subject')
    expect(email.template).toBe('default')
    expect(email.body).toBe('Test Body')
  })

  test('should create an email instance from valid input object', () => {
    const inputObject: IEmail = {
      to: 'test@example.com',
      subject: 'Test Subject',
      template: 'default',
      body: 'Test Body',
    }
    const email = EmailFactory.createEmail(inputObject)
    expect(email).toEqual(expect.any(Object))
    expect(email.to).toBe('test@example.com')
    expect(email.subject).toBe('Test Subject')
    expect(email.template).toBe('default')
    expect(email.body).toBe('Test Body')
  })

  test('should throw an error for invalid email structure', () => {
    const invalidInput = '{"to": "test@example.com", "subject": "Test Subject"}'
    expect(() => EmailFactory.createEmail(invalidInput)).toThrow(
      'Invalid email structure'
    )
  })

  test('should log an error for invalid email structure', () => {
    const invalidInput = '{"to": "test@example.com", "subject": "Test Subject"}'
    const spyLogError = jest.spyOn(logger, 'logError')
    expect(() => EmailFactory.createEmail(invalidInput)).toThrow(
      'Invalid email structure'
    )
    expect(spyLogError).toHaveBeenCalledWith(
      'Invalid email structure',
      expect.any(Error)
    )
  })
})
