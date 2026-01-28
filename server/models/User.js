// Model User
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Email harus unik
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Boleh null untuk OAuth
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    auth_provider: {
      type: DataTypes.ENUM("local", "google", "facebook"),
      allowNull: false,
      defaultValue: "local",
    },
    provider_id: {
      type: DataTypes.STRING(255),
      allowNull: true, // ID dari OAuth provider
    },
    membership_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Null sampai user pilih tipe
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = User;
