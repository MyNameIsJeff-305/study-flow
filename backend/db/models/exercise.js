'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.belongsTo(models.StudyPlan, { foreignKey: 'studyPlanId', onDelete: 'CASCADE' });
      Exercise.hasMany(models.UserExercise, { foreignKey: 'exerciseId', onDelete: 'CASCADE' });
    }
  }
  Exercise.init({
    exercise: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    studyPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Studyplans',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};