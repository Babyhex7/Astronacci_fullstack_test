"use strict";

// Migration Buat tabel users
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      auth_provider: {
        type: Sequelize.ENUM("local", "google", "facebook"),
        allowNull: false,
        defaultValue: "local",
      },
      provider_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      membership_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "memberships",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
