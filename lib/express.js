import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import logger from './logger';
import initRoutes from './../app/routes';
import Responder from './expressResponder';

const app = express();

function initMiddleware() {
  app.set('showStackError', true);
  app.enable('jsonp callback');
  app.use(morgan('combined', { stream: logger.stream }));

  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cors());
}

function initErrorRoutes() {
  app.use((err, req, res, next) => {
    if (!err) {
      return next();
    }
    return Responder.operationFailed(res, err);
  });
}

export function init() {

  // Initialize Express middleware
  initMiddleware();

  // Initialize modules server routes
  initRoutes(app);

  // Initialize error routes
  initErrorRoutes();

  return app;
}
