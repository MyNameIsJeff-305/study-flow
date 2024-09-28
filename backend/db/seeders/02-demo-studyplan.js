'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('StudyPlans', [
      {
        subject: 'Mathematics',
        goal: 'Master calculus by the end of the semester',
        createdBy: 1, 
      },
      {
        subject: 'Physics',
        goal: 'Understand Newtonian mechanics in 3 months',
        createdBy: 1, 
      },
      {
        subject: 'History',
        goal: 'Memorize major historical events in the 20th century',
        createdBy: 3, 
      },
      {
        subject: 'Programming',
        goal: 'Complete the full JavaScript course in 2 months',
        createdBy: 3, 
      },
      {
        subject: 'Chemistry',
        goal: 'Learn organic chemistry for the upcoming exams',
        createdBy: 3, 
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StudyPlans', null, {});
  }
};
