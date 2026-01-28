// Routes Articles
const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const authMiddleware = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");

// GET /api/articles - Ambil semua artikel (perlu login)
router.get("/", authMiddleware, articlesController.getAllArticles);

// GET /api/articles/:id - Detail artikel (perlu login + cek akses)
router.get(
  "/:id",
  authMiddleware,
  checkAccess("article"),
  articlesController.getArticleById,
);

module.exports = router;
