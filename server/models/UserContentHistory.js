// Model UserContentHistory (Tracking akses konten)
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserContentHistory = sequelize.define(
  "UserContentHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK ke users
    },
    content_type: {
      type: DataTypes.ENUM("article", "video"),
      allowNull: false, // Tipe konten
    },
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // ID artikel/video
    },
    accessed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Waktu akses
    },
  },
  {
    tableName: "user_content_history",
    timestamps: false,
  },
);

module.exports = UserContentHistory;
