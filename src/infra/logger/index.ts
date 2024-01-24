import { WinstonLogProvider } from './providers/winston.provider'

export interface ILoggerProvider {
  logInfo(message: string): void
  logDebug(message: string): void
  logError(message: string, err?: any): void
}

export class Logger implements ILoggerProvider {
  private logProvider: ILoggerProvider

  constructor(logProvider: ILoggerProvider = new WinstonLogProvider()) {
    this.logProvider = logProvider
  }

  logInfo(message: string): void {
    this.logProvider.logInfo(message)
  }

  logDebug(message: string): void {
    this.logProvider.logDebug(message)
  }

  logError(message: string, err?: any): void {
    this.logProvider.logError(message, err)
  }
}

export const logger = new Logger(new WinstonLogProvider())
