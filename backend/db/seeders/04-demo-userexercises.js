'use strict';

let options = {};
options.tableName = 'UserExercises';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        exerciseId: 6,
      },
      {
        userId: 1,
        exerciseId: 7,
      },
      {
        userId: 1,
        exerciseId: 8,
      },
      {
        userId: 1,
        exerciseId: 9,
      },
      {
        userId: 1,
        exerciseId: 10,
      },
      {
        userId: 2,
        exerciseId: 1,
      },
      {
        userId: 2,
        exerciseId: 2,
      },
      {
        userId: 2,
        exerciseId: 3,
      },
      {
        userId: 2,
        exerciseId: 4,
      },
      {
        userId: 2,
        exerciseId: 5,
      },
      {
        userId: 2,
        exerciseId: 6,
      },
      {
        userId: 3,
        exerciseId: 1,
      },
      {
        userId: 3,
        exerciseId: 5,
      },
      {
        userId: 3,
        exerciseId: 6,
      },
      {
        userId: 3,
        exerciseId: 7,
      },
      {
        userId: 3,
        exerciseId: 8,
      },
      {
        userId: 3,
        exerciseId: 9,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'UserExercises';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      exerciseId: {
        [Op.in]: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
        ]
      }
    })
  }
};
