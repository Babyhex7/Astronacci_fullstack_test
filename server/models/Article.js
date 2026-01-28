// Model Article (Artikel Analisis & Research)
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false, // Judul artikel
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Isi artikel
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true, // Kategori: saham, crypto, forex
    },
    thumbnail_url: {
      type: DataTypes.STRING(500),
      allowNull: true, // URL gambar thumbnail
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Article;
