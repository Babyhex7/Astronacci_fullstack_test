"use strict";

// Migration: Buat tabel user_content_history
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_content_history", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      content_type: {
        type: Sequelize.ENUM("article", "video"),
        allowNull: false,
      },
      content_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accessed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Index untuk performa query
    await queryInterface.addIndex("user_content_history", [
      "user_id",
      "content_type",
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_content_history");
  },
};
