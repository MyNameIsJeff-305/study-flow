'use strict';

let options = {};
options.tableName = 'Exercises';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        exercise: 'Practice integral problems for 30 minutes',
        studyPlanId: 1,
      },
      {
        exercise: 'Review and solve 10 physics problems from Newton’s laws',
        studyPlanId: 2,
      },
      {
        exercise: 'Write a summary of key events in the 20th century',
        studyPlanId: 3,
      },
      {
        exercise: 'Complete a coding challenge for array manipulation in JavaScript',
        studyPlanId: 4,
      },
      {
        exercise: 'Review organic chemistry reactions and practice 5 problems',
        studyPlanId: 5,
      },
      {
        exercise: 'Solve 5 differential equation problems',
        studyPlanId: 1, 
      },
      {
        exercise: 'Watch a 30-minute video on classical mechanics',
        studyPlanId: 2, 
      },
      {
        exercise: 'Read a chapter on World War II and write key takeaways',
        studyPlanId: 3, 
      },
      {
        exercise: 'Build a small project using JavaScript promises',
        studyPlanId: 4, 
      },
      {
        exercise: 'Create flashcards for organic chemistry functional groups',
        studyPlanId: 5, 
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      exercise: {
        [Op.in]: [
          'Practice integral problems for 30 minutes',
          'Review and solve 10 physics problems from Newton’s laws',
          'Write a summary of key events in the 20th century',
          'Complete a coding challenge for array manipulation in JavaScript',
          'Review organic chemistry reactions and practice 5 problems',
          'Solve 5 differential equation problems',
          'Watch a 30-minute video on classical mechanics',
          'Read a chapter on World War II and write key takeaways',
          'Build a small project using JavaScript promises',
          'Create flashcards for organic chemistry functional groups'
        ]
      }
    });
  }
};
