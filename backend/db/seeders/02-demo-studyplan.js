'use strict';

let options = {};
options.tableName = 'Studyplans';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        subject: 'Mathematics',
        goal: 'Master calculus by the end of the semester',
        deadline: "3 months",
        createdBy: 1,
        imageUrl: "https://images.theconversation.com/files/139426/original/image-20160927-14593-1rf92dt.jpg"
      },
      {
        subject: 'Physics',
        goal: 'Understand Newtonian mechanics in 3 months',
        deadline: "3 months",
        createdBy: 1, 
        imageUrl: "https://www.timeshighereducation.com/student/sites/default/files/styles/default/public/physics_blackboard.jpg"
      },
      {
        subject: 'History',
        goal: 'Memorize major historical events in the 20th century',
        deadline: "2 months",
        createdBy: 3, 
        imageUrl: "https://www.euroschoolindia.com/wp-content/uploads/2023/07/importance-of-history-scaled-1.jpg"
      },
      {
        subject: 'Programming',
        goal: 'Complete the full JavaScript course in 2 months',
        deadline: "2 months",
        createdBy: 3, 
        imageUrl: "https://cdn.prod.website-files.com/5f2b1efb0f881760ffdc5c96/63c12849a1c7e9df64c819fc_programming-languages-shutterstock-1680857539.webp"
      },
      {
        subject: 'Chemistry',
        goal: 'Learn organic chemistry for the upcoming exams',
        deadline: "1 month",
        createdBy: 3, 
        imageUrl: "https://www.thoughtco.com/thmb/6MsMmUK27akFhb8i89kj95J5iko=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-545286316-433dd345105e4c6ebe4cdd8d2317fdaa.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      subject: {
        [Op.in]: ['Mathematics', 'Physics', 'History', 'Programming', 'Chemistry']
      }
    });
  }
};
