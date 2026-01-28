"use strict";

// Migration: Buat tabel memberships
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("memberships", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("A", "B", "C"),
        allowNull: false,
      },
      article_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      video_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("memberships");
  },
};
