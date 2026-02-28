/**
 * Centralized Logging Utility for SmarterBot.cl
 * 
 * Provides structured logging with appropriate log levels.
 * In production, sensitive data is automatically masked.
 * 
 * @usage
 *   import { logger } from '@/lib/logger'
 *   logger.info('User logged in', { userId: '123' })
 *   logger.error('Database error', error)
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  [key: string]: unknown
}

export interface LoggerConfig {
  /** Minimum log level to display */
  level: LogLevel
  /** Enable/disable logging entirely */
  enabled: boolean
  /** Mask sensitive fields in production */
  maskSensitive: boolean
  /** Include timestamp in logs */
  includeTimestamp: boolean
}

// Sensitive field patterns to mask
const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /api[_-]?key/i,
  /access[_-]?token/i,
  /refresh[_-]?token/i,
  /private[_-]?key/i,
  /authorization/i,
  /bearer/i,
  /credit[_-]?card/i,
  /card[_-]?number/i,
  /cvv/i,
  /pin/i,
]

const DEFAULT_CONFIG: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  enabled: process.env.LOGGING_ENABLED !== 'false',
  maskSensitive: process.env.NODE_ENV === 'production',
  includeTimestamp: true,
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class Logger {
  private config: LoggerConfig

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Check if a log level should be displayed
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.level]
  }

  /**
   * Mask sensitive data in an object
   */
  private maskSensitiveData(data: unknown, depth = 0): unknown {
    if (!this.config.maskSensitive || depth > 5) {
      return data
    }

    if (data === null || data === undefined) {
      return data
    }

    if (typeof data === 'string') {
      // Mask long strings that look like secrets
      if (data.length > 20 && /^[a-zA-Z0-9_-]+$/.test(data)) {
        return `${data.slice(0, 4)}...${data.slice(-4)}`
      }
      return data
    }

    if (typeof data === 'number' || typeof data === 'boolean') {
      return data
    }

    if (Array.isArray(data)) {
      return data.map(item => this.maskSensitiveData(item, depth + 1))
    }

    if (typeof data === 'object') {
      const masked: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(data)) {
        const isSensitive = SENSITIVE_PATTERNS.some(pattern => pattern.test(key))
        masked[key] = isSensitive ? '[REDACTED]' : this.maskSensitiveData(value, depth + 1)
      }
      return masked
    }

    return data
  }

  /**
   * Format log message
   */
  private formatMessage(level: LogLevel, message: string, context?: LogContext | Error): string {
    const timestamp = this.config.includeTimestamp 
      ? new Date().toISOString() 
      : ''
    
    const maskedContext = context instanceof Error 
      ? { message: context.message, stack: context.stack, name: context.name }
      : this.maskSensitiveData(context || {})

    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      context: typeof maskedContext === 'object' && maskedContext !== null && Object.keys(maskedContext).length > 0 ? maskedContext : undefined,
      env: process.env.NODE_ENV || 'development',
    }

    return JSON.stringify(logEntry)
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context))
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context))
    }
  }

  warn(message: string, context?: LogContext | Error): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context))
    }
  }

  error(message: string, context?: LogContext | Error): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context))
    }
  }

  /**
   * Create a child logger with additional default context
   */
  child(defaultContext: LogContext): ChildLogger {
    return new ChildLogger(this, defaultContext)
  }
}

class ChildLogger {
  constructor(
    private parent: Logger,
    private defaultContext: LogContext
  ) {}

  debug(message: string, context?: LogContext): void {
    this.parent.debug(message, { ...this.defaultContext, ...context })
  }

  info(message: string, context?: LogContext): void {
    this.parent.info(message, { ...this.defaultContext, ...context })
  }

  warn(message: string, context?: LogContext | Error): void {
    this.parent.warn(message, { ...this.defaultContext, ...context })
  }

  error(message: string, context?: LogContext | Error): void {
    this.parent.error(message, { ...this.defaultContext, ...context })
  }
}

// Export singleton instance
export const logger = new Logger()

// Export for testing
export { Logger }
