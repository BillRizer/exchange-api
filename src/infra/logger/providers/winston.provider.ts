import winston from 'winston'
import { ILoggerProvider } from '../index'

export class WinstonLogProvider implements ILoggerProvider {
  private logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: './logs/',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: './logs/',
          filename: 'debug.log',
          level: 'debug',
        }),
      ],
    })
  }

  logError(message: string, err?: any): void {
    this.logger.error(message, err)
  }

  logInfo(message: string): void {
    this.logger.info(message)
  }

  logDebug(message: string): void {
    this.logger.debug(message)
  }
}
