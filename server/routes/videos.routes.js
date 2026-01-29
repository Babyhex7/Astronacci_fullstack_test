// Routes Videos
const express = require("express");
const router = express.Router();
const videosController = require("../controllers/videos.controller");
const authMiddleware = require("../middleware/auth");
const checkAccess = require("../middleware/checkAccess");


router.get("/", authMiddleware, videosController.getAllVideos);
router.get(
  "/:id",
  authMiddleware,
  checkAccess("video"),
  videosController.getVideoById,
);

module.exports = router;
