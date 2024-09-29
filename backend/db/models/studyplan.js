'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyPlan extends Model {
    static associate(models) {
      StudyPlan.belongsTo(models.User, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
      StudyPlan.hasMany(models.Exercise, { foreignKey: 'studyPlanId', onDelete: 'CASCADE' });
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
    deadline: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ''
    },
    imageUrl: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'StudyPlan',
  });
  return StudyPlan;
};