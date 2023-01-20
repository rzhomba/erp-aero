'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class files extends Model {
    static associate(models) {
      this.hasOne(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  files.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'files',
  });
  return files;
};
