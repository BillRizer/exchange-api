import { IEmail } from './email.factory'

export interface IEmailProvider {
  sendEmail(to: string, subject: string, body: string): Promise<void>
}

export class EmailSender {
  private emailProvider: IEmailProvider

  constructor(provider: IEmailProvider) {
    this.emailProvider = provider
  }

  async sendEmail(email: IEmail): Promise<void> {
    await this.emailProvider.sendEmail(email.to, email.subject, email.body)
  }
}
