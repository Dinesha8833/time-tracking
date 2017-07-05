import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import logger from './logger';
import initRoutes from './../app/routes';
import Responder from './expressResponder';
import path from 'path';

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

  const basepath = path.dirname(__dirname);
  app.use('/assets', express.static(path.join(basepath, 'client')));
  app.use('/assets/js', express.static(path.join(basepath, 'client', 'js')));

  // Initialize modules server routes
  initRoutes(app);

  app.use("/*", (req, res) => res.sendFile(path.join('views', 'index.html'), { root: path.join(basepath, 'client') }));

  // Initialize error routes
  initErrorRoutes();

  return app;
}
