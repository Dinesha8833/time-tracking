import Sequelize from 'sequelize';

const User = (sequelize) => {
  return sequelize.define('user', {
    fb_id: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  });
}

export default User;
