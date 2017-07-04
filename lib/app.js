import config from 'config';
import http from 'http';
import * as express from './express';
import * as sequelize from './sequelize';
import initPassport from './passport';
import logger from './logger';

export function start() {
  const port = config.get('port');

  const appStartMessage = () => {
    const env = process.env.NODE_ENV;
    logger.debug(`App is Initialized`);
    logger.info(`App Name : ${config.app.name}`);
    logger.info(`Server Name : ${config.app.description}`);
    logger.info(`Environment  : ${env || 'development'}`);
    logger.info(`App Port : ${port}`);
    logger.info(`Process Id : ${process.pid}`);
  };

  initPassport();
  
  sequelize.connect(() => {
    const app = express.init();
    http.createServer(app).listen(port, appStartMessage);
  });

};
