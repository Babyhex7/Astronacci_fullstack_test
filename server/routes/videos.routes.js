// Routes Videos
const express = require("express");
const router = express.Router();
const videosController = require("../controllers/videos.controller");
const authMiddleware = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");

// GET /api/videos - Ambil semua video (perlu login)
router.get("/", authMiddleware, videosController.getAllVideos);

// GET /api/videos/:id - Detail video (perlu login + cek akses)
router.get(
  "/:id",
  authMiddleware,
  checkAccess("video"),
  videosController.getVideoById,
);

module.exports = router;
