'use strict';

let options = {};
options.tableName = 'Exercises';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exercises', [
      {
        exercise: 'Practice integral problems for 30 minutes',
        studyPlanId: 1, // Assuming StudyPlan with id 1 exists (Mathematics)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Review and solve 10 physics problems from Newton’s laws',
        studyPlanId: 2, // Assuming StudyPlan with id 2 exists (Physics)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Write a summary of key events in the 20th century',
        studyPlanId: 3, // Assuming StudyPlan with id 3 exists (History)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Complete a coding challenge for array manipulation in JavaScript',
        studyPlanId: 4, // Assuming StudyPlan with id 4 exists (Programming)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Review organic chemistry reactions and practice 5 problems',
        studyPlanId: 5, // Assuming StudyPlan with id 5 exists (Chemistry)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Solve 5 differential equation problems',
        studyPlanId: 1, // More exercises for StudyPlan 1 (Mathematics)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Watch a 30-minute video on classical mechanics',
        studyPlanId: 2, // More exercises for StudyPlan 2 (Physics)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Read a chapter on World War II and write key takeaways',
        studyPlanId: 3, // More exercises for StudyPlan 3 (History)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Build a small project using JavaScript promises',
        studyPlanId: 4, // More exercises for StudyPlan 4 (Programming)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        exercise: 'Create flashcards for organic chemistry functional groups',
        studyPlanId: 5, // More exercises for StudyPlan 5 (Chemistry)
        createdAt: new Date(),
        updatedAt: new Date()
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
