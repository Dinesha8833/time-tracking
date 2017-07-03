import config from 'config';
import Sequelize from 'sequelize';
import TaskSchema from './task';
import UserSchema from './user';
import TokenSchema from './token';

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.settings);

const Task = TaskSchema(sequelize);
const User = UserSchema(sequelize);
const Token = TokenSchema(sequelize);
User.hasMany(Task);
User.hasMany(Token);

export { Task, User, Token, sequelize };
