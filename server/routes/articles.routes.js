const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const authMiddleware = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");

router.get("/", authMiddleware, articlesController.getAllArticles);
router.get(
  "/:id",
  authMiddleware,
  checkAccess("article"),
  articlesController.getArticleById,
);

module.exports = router;
