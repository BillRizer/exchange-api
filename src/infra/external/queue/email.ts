import { config } from '@/config/config'
import { MailtrapProvider } from '../email/mailtrap.provider'
import { EmailSender } from '../email/base-emai.provider'
import {
  IRabbitMQConnection,
  RabbitMQProvider,
} from './providers/rabbitmq.provider'
import { EmailFactory, IEmail } from '../email/email.factory'

export class EmailQueueWrapper {
  private provider: RabbitMQProvider | null = null

  constructor(private config: IRabbitMQConnection) {}

  async initialize(): Promise<void> {
    this.provider = new RabbitMQProvider(this.config)
    await this.provider.initialize()
  }

  async publish(
    emailObject: IEmail,
    useExchange: boolean
  ): Promise<boolean | undefined> {
    if (!this.provider) {
      throw new Error(
        'RabbitMQWrapper not initialized. Call initialize() first.'
      )
    }
    const message = JSON.stringify(emailObject)

    return useExchange
      ? this.provider.publishInExchange(message)
      : this.provider.publishInQueue(message)
  }

  async consume(): Promise<void> {
    if (!this.provider) {
      throw new Error(
        'RabbitMQWrapper not initialized. Call initialize() first.'
      )
    }
    await this.provider.consumeMessages(async (message: any) => {
      await this.handleConsume(message)
    })
  }

  async handleConsume(message: string) {
    try {
      const email: IEmail = EmailFactory.createEmail(message)
      if (email) {
        const gmailEmailProvider = new MailtrapProvider()
        const emailSender = new EmailSender(gmailEmailProvider)
        await emailSender.sendEmail(email)
      }
    } catch (error) {
      return
    }
  }

  async closeConnection(): Promise<void> {
    if (!this.provider) {
      throw new Error(
        'RabbitMQWrapper not initialized. Call initialize() first.'
      )
    }

    await this.provider.closeConnection()
    this.provider = null
  }
}

export const defaultEmailQueueConfig: IRabbitMQConnection = {
  exchangeName: 'exchange-name',
  queueName: 'queue-name',
  rountingKeyName: 'routingKey-name',
  amqpUrl: config.AMQP_URL,
}
