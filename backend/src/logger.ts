import winston from 'winston'

class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'silly',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      ],
    });
  }

  info(...msg: any[]): void {
    const infoLog = msg.join(' ');
    this.logger.log('info', infoLog);
  }

  warn(...msg: any[]): void {
    const warnLog = msg.join(' ');
    this.logger.log('warn', warnLog);
  }

  error(...msg: any[]): void {
    const errorLog = msg.join(' ');
    this.logger.log('error', errorLog);
  }
}

export default new LoggerService();
