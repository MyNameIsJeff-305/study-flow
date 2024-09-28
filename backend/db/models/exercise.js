'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.belongsTo(models.StudyPlan, { foreignKey: 'studyPlanId' });
    }
  }
  Exercise.init({
    exercise: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    studyPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};