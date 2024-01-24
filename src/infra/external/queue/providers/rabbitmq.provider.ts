import { logger } from '@/infra/logger'
import amqp, { Connection, Options, Channel } from 'amqplib'

export interface IRabbitMQConnection {
  amqpUrl: string
  queueName: string
  exchangeName: string
  rountingKeyName: string
}
export class RabbitMQProvider {
  amqpUrl: string
  queueName: string
  exchangeName: string
  rountingKeyName: string
  connection: Connection
  channel: Channel

  constructor(config: IRabbitMQConnection) {
    this.amqpUrl = config.amqpUrl
    this.queueName = config.queueName
    this.exchangeName = config.exchangeName
    this.rountingKeyName = config.rountingKeyName
  }

  async initialize(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.amqpUrl)
      this.channel = await this.connection.createChannel()
      await this.channel.assertExchange(this.exchangeName, 'direct')
      await this.channel.assertQueue(this.queueName)
      await this.channel.bindQueue(
        this.queueName,
        this.exchangeName,
        this.rountingKeyName
      )
    } catch (error) {
      logger.logError('Error initializing RabbitMQ', error)
    }
  }

  async publishInQueue(message: string): Promise<boolean | undefined> {
    try {
      return this.channel.sendToQueue(this.queueName, Buffer.from(message))
    } catch (error) {
      logger.logError('Error sending message to RabbitMQ:', error)
    }
  }

  async publishInExchange(message: string): Promise<boolean> {
    return this.channel.publish(
      this.exchangeName,
      this.rountingKeyName,
      Buffer.from(message)
    )
  }

  async consumeMessages(callback: any) {
    try {
      await this.channel.consume(this.queueName, (msg: any) => {
        if (msg !== null) {
          const message = msg.content.toString()
          callback(message)
          this.channel.ack(msg)
        }
      })
    } catch (error) {
      logger.logError('Error consuming messages from RabbitMQ:', error)
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await this.channel.close()
      await this.connection.close()
      logger.logInfo('RabbitMQ connection closed')
    } catch (error) {
      logger.logError('Error closing RabbitMQ connection:', error)
    }
  }
}
