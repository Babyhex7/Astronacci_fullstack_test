// Routes Auth: Register, Login, OAuth
const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

// POST /api/auth/register - Register manual
router.post("/register", authController.register);

router.post(
  "/select-membership",
  authMiddleware,
  authController.selectMembership,
);

// POST /api/auth/login - Login manual
router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.getMe);

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
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`,
    session: false,
  }),
  authController.oauthCallback,
);

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
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`,
    session: false,
  }),
  authController.oauthCallback,
);

// POST /api/auth/logout - Logout secure (clear HTTP-only cookie)
router.post("/logout", authController.logout);

module.exports = router;
