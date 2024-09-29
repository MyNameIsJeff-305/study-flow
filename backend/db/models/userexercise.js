'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExercise extends Model {
    static associate(models) {
      UserExercise.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      UserExercise.belongsTo(models.Exercise, {
        foreignKey: 'exerciseId',
        onDelete: 'CASCADE'
      });
    }
  }
  UserExercise.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Exercises',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UserExercise',
  });
  return UserExercise;
};