'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.StudyPlan, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
      User.hasMany(models.UserExercise, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImg: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
