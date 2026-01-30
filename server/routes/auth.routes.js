const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.post("/register", authController.register);
router.post(
  "/select-membership",
  authMiddleware,
  authController.selectMembership,
);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`,
    session: false,
  }),
  authController.oauthCallback,
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`,
    session: false,
  }),
  authController.oauthCallback,
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=oauth_failed`,
    session: false,
  }),
  authController.oauthCallback,
);

router.post("/link-account", authController.linkAccount);
router.post("/logout", authController.logout);

module.exports = router;
