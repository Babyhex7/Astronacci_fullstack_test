// Routes Users
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth");

// GET /api/users/profile - Ambil profil (perlu login)
router.get("/profile", authMiddleware, usersController.getProfile);

// GET /api/users/stats - Statistik akses (perlu login)
router.get("/stats", authMiddleware, usersController.getStats);

module.exports = router;
