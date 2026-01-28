// Model Video (Video Tutorial Trading)
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false, // Judul video
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Deskripsi video
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true, // Kategori: teknikal, fundamental
    },
    video_url: {
      type: DataTypes.STRING(500),
      allowNull: false, // URL YouTube embed
    },
    thumbnail_url: {
      type: DataTypes.STRING(500),
      allowNull: true, // URL thumbnail
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true, // Durasi dalam menit
    },
  },
  {
    tableName: "videos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Video;
