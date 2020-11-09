'use strict';

const { hashPass } = require('../helpers/bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = [{
      email: 'admin@mail.com',
      password: hashPass('1234'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('Users', admin, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
