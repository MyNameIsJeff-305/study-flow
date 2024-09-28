'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyPlan extends Model {
    static associate(models) {
      StudyPlan.belongsTo(models.User, { foreignKey: 'createdBy' });
      StudyPlan.hasMany(models.Exercise, { foreignKey: 'studyPlanId' });
    }
  }
  StudyPlan.init({
    subject: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    goal: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'StudyPlan',
  });
  return StudyPlan;
};