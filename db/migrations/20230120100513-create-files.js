'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      file_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      originalname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      extension: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mimetype: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      uploaded: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface) {
    await queryInterface.dropTable('files')
  }
}
