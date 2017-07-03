import logger from './logger';
import { sequelize } from '../app/models';

export function connect(cb) {
  sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(cb)
    .catch(error => {
      logger.error(error);
      cb(error);
    });
}