'use strict';
const { hashPass } = require('../helpers/bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let customer = [{
      email: 'dor@mail.com',
      password: hashPass('12345'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('Users', customer, {});
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
