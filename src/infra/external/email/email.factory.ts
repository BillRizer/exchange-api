import { logger } from '../../../infra/logger'

export interface IEmail {
  to: string
  subject: string
  template: string
  body: string
}

export class Email implements IEmail {
  constructor(
    public to: string,
    public subject: string,
    public template: string,
    public body: string
  ) {}
}

export class EmailFactory {
  static createEmail(input: string | IEmail): IEmail {
    try {
      let emailObject: IEmail

      if (typeof input === 'string') {
        emailObject = JSON.parse(input) as IEmail
      } else {
        emailObject = input
      }

      if (!EmailFactory.isEmailValid(emailObject)) {
        throw new Error('Invalid email structure')
      }
      return emailObject
    } catch (error) {
      logger.logError('Invalid email structure', error)
      throw error
    }
  }

  private static isEmailValid(obj: any): obj is IEmail {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'to' in obj &&
      'subject' in obj &&
      'template' in obj &&
      'body' in obj
    )
  }
}
