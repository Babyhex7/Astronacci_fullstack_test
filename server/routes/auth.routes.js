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


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.oauthCallback,
);


// GET /api/auth/facebook - Redirect ke Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);


router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  authController.oauthCallback,
);

module.exports = router;
