'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.belongsTo(models.files)
    }
  }
  Users.init({
    id: DataTypes.STRING,
    password: DataTypes.STRING,
    revoke_token_until: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
