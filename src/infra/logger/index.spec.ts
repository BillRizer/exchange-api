import { ILoggerProvider, Logger } from './index'

class MockLoggerProvider implements ILoggerProvider {
  logInfo(message: string): void {
    jest.fn()
  }
  logDebug(message: string): void {
    jest.fn()
  }
  logError(message: string, err?: any): void {
    jest.fn()
  }
}

describe('Logger', () => {
  test('should create a Logger instance with default WinstonLogProvider', () => {
    const logger = new Logger()
    expect(logger).toBeInstanceOf(Logger)
  })

  test('should create a Logger instance with a custom log provider', () => {
    const customLogProvider = new MockLoggerProvider()
    const logger = new Logger(customLogProvider)
    expect(logger).toBeInstanceOf(Logger)
  })

  test('should call logInfo on the log provider for logInfo method', () => {
    const customLogProvider = new MockLoggerProvider()
    const logger = new Logger(customLogProvider)
    const spyLogInfo = jest.spyOn(customLogProvider, 'logInfo')
    logger.logInfo('Test Message')
    expect(spyLogInfo).toHaveBeenCalledWith('Test Message')
  })

  test('should call logDebug on the log provider for logDebug method', () => {
    const customLogProvider = new MockLoggerProvider()
    const logger = new Logger(customLogProvider)
    const spyLogDebug = jest.spyOn(customLogProvider, 'logDebug')
    logger.logDebug('Test Message')
    expect(spyLogDebug).toHaveBeenCalledWith('Test Message')
  })

  test('should call logError on the log provider for logError method', () => {
    const customLogProvider = new MockLoggerProvider()
    const logger = new Logger(customLogProvider)
    const spyLogError = jest.spyOn(customLogProvider, 'logError')
    logger.logError('Test Message', new Error('Test Error'))
    expect(spyLogError).toHaveBeenCalledWith('Test Message', expect.any(Error))
  })
})
