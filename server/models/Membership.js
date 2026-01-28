// Model Membership (Tipe A/B/C)
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Membership = sequelize.define(
  "Membership",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false, // Nama: Tipe A - Free, Tipe B - Basic, Tipe C - Premium
    },
    type: {
      type: DataTypes.ENUM("A", "B", "C"),
      allowNull: false, // Kode tipe membership
    },
    article_limit: {
      type: DataTypes.INTEGER,
      allowNull: false, // Batas artikel (-1 = unlimited)
    },
    video_limit: {
      type: DataTypes.INTEGER,
      allowNull: false, // Batas video (-1 = unlimited)
    },
  },
  {
    tableName: "memberships",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Membership;
