const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");

router.get("/profile", authMiddleware, usersController.getProfile);
router.get("/stats", authMiddleware, usersController.getStats);

module.exports = router;
