import express from 'express';
import passport from 'passport';
import TaskController from '../controllers/taskController';

const initTaskRoutes = () => {
  const taskRoutes = express.Router();

  taskRoutes.get('/', passport.authenticate('accessToken'), TaskController.page);

  return taskRoutes;
};

export default initTaskRoutes;
