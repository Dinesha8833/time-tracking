import Sequelize from 'sequelize';

const Token = (sequelize) => {
  return sequelize.define('token', {
    token: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('admin', 'user')
    }
  });;
};

export default Token;
