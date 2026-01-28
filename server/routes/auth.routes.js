// Routes Auth: Register, Login, OAuth
const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

// POST /api/auth/register - Register manual
router.post("/register", authController.register);

// POST /api/auth/select-membership - Pilih tipe (perlu login)
router.post(
  "/select-membership",
  authMiddleware,
  authController.selectMembership,
);

// POST /api/auth/login - Login manual
router.post("/login", authController.login);

// GET /api/auth/me - Get current user (perlu login)
router.get("/me", authMiddleware, authController.getMe);

// === GOOGLE OAUTH ===
// GET /api/auth/google - Redirect ke Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// GET /api/auth/google/callback - Callback dari Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.oauthCallback,
);

// === FACEBOOK OAUTH ===
// GET /api/auth/facebook - Redirect ke Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);

// GET /api/auth/facebook/callback - Callback dari Facebook
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  authController.oauthCallback,
);

module.exports = router;
