import winston from 'winston';
import config from 'config';

winston.emitErrs = true;

let logLevel = config.loglevel || 'error';

const transports = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
  })
];

const logger = new winston.Logger({ transports: transports, exitOnError: false });

module.exports = logger;

module.exports.stream = {
  write: (message) => {
    logger.info(message);
  }
};
