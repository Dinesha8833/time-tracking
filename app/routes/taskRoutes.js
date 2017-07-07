import express from 'express';
import passport from 'passport';
import TaskController from '../controllers/taskController';

const initTaskRoutes = () => {
  const taskRoutes = express.Router();

  taskRoutes.get('/', passport.authenticate('accessToken'), TaskController.page);
  taskRoutes.post('/', passport.authenticate('accessToken'), TaskController.create);

  return taskRoutes;
};

export default initTaskRoutes;
