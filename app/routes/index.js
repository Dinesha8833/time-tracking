import initAuthRoutes from './authRoutes';
import initTaskRoutes from './taskRoutes';

const initRoutes = (app) => {
  app.use(`/auth`, initAuthRoutes());
  app.use(`/tasks`, initTaskRoutes());
};

export default initRoutes;
