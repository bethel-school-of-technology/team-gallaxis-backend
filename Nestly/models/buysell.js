'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buySell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  buySell.init({
    PostId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PostTitle: DataTypes.STRING,
    PostBody: DataTypes.STRING,
    Deleted: DataTypes.BOOLEAN,
    UserId: {
      type: DataTypes.INTEGER,
      model: "users",
      key: "UserId"
    }
  }, {
    sequelize,
    modelName: 'buySell',
  });
  buySell.associate = function(models) {
    // associations can be defined here
  };
  return buySell;
};