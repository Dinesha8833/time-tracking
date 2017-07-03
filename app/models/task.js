import Sequelize from 'sequelize';

const Task = (sequelize) => {
  return sequelize.define('task', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.STRING
    }
  });;
};

export default Task;
