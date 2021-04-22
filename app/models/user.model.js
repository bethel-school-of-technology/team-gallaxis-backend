module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    communityName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  
  });

  return User;
};
