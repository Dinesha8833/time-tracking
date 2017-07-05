import initAuthRoutes from './authRoutes';

const initRoutes = (app) => {
  app.use(`/auth`, initAuthRoutes());
};

export default initRoutes;
