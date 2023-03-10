'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      revoke_access_token_until: {
        allowNull: true,
        type: Sequelize.DATE
      },
      revoke_refresh_token_until: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface) {
    await queryInterface.dropTable('users')
  }
}
