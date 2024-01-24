import { config } from '../../../config/config'
import { IEmailProvider } from './base-emai.provider'
import nodemailer from 'nodemailer'
import { logger } from '../../../infra/logger'

export interface IMailtrapConfig {
  username: string
  password: string
}

export class MailtrapProvider implements IEmailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: config.MAILTRAP_USER,
        pass: config.MAILTRAP_PASS,
      },
    })
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    logger.logInfo(`Mailtrap Sending email to ${to} with subject: ${subject}`)

    const mailOptions: nodemailer.SendMailOptions = {
      from: config.MAILTRAP_FROM,
      to,
      subject,
      text: body,
    }

    let attempts = 0
    const maxAttempts = config.MAILTRAP_MAX_ATTEMPTS

    while (attempts < maxAttempts) {
      try {
        await this.transporter.sendMail(mailOptions)
        await this.delay(1000)
        logger.logInfo(`Email sent successfully.`)
        return
      } catch (error) {
        attempts++
        logger.logError(`Error sending email (Attempt ${attempts}):`, error)

        if (attempts < maxAttempts) {
          logger.logInfo(
            `Waiting for ${config.MAILTRAP_DELAY} seconds before retrying send email`
          )
          await this.delay(config.MAILTRAP_DELAY)
        } else {
          throw new Error(`Error sending email after ${maxAttempts} attempts.`)
        }
      }
    }
  }
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
