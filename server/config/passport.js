const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { Op } = require("sequelize");
const { User, Membership } = require("../models");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Membership, as: "membership" }],
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "xxx") {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "google" },
            include: [{ model: Membership, as: "membership" }],
          });

          if (user) {
            user.dataValues.isNewUser = false;
            return done(null, user);
          }

          const existingUserByEmail = await User.findOne({
            where: { email: email },
            include: [{ model: Membership, as: "membership" }],
          });

          if (existingUserByEmail) {
            existingUserByEmail.dataValues.needLinkAccount = true;
            existingUserByEmail.dataValues.newProvider = "google";
            existingUserByEmail.dataValues.newProviderId = profile.id;
            existingUserByEmail.dataValues.existingProvider =
              existingUserByEmail.auth_provider;
            existingUserByEmail.dataValues.newAvatarUrl =
              profile.photos?.[0]?.value || null;
            return done(null, existingUserByEmail);
          }

          user = await User.create({
            email: email,
            full_name: profile.displayName,
            avatar_url: profile.photos?.[0]?.value || null,
            auth_provider: "google",
            provider_id: profile.id,
            membership_id: null,
          });

          user.dataValues.isNewUser = true;
          done(null, user);
        } catch (err) {
          console.error("Google OAuth Error:", err.message);
          done(err);
        }
      },
    ),
  );
  console.log("[Passport] Google OAuth aktif");
} else {
  console.log("[Passport] Google OAuth tidak dikonfigurasi");
}

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_ID !== "xxx") {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `fb_${profile.id}@facebook.com`;

          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "facebook" },
            include: [{ model: Membership, as: "membership" }],
          });

          if (user) {
            user.dataValues.isNewUser = false;
            return done(null, user);
          }

          const existingUserByEmail = await User.findOne({
            where: { email: email },
            include: [{ model: Membership, as: "membership" }],
          });

          if (existingUserByEmail) {
            existingUserByEmail.dataValues.needLinkAccount = true;
            existingUserByEmail.dataValues.newProvider = "facebook";
            existingUserByEmail.dataValues.newProviderId = profile.id;
            existingUserByEmail.dataValues.existingProvider =
              existingUserByEmail.auth_provider;
            existingUserByEmail.dataValues.newAvatarUrl =
              profile.photos?.[0]?.value || null;
            return done(null, existingUserByEmail);
          }

          user = await User.create({
            email: email,
            full_name: profile.displayName,
            avatar_url: profile.photos?.[0]?.value || null,
            auth_provider: "facebook",
            provider_id: profile.id,
            membership_id: null,
          });

          user.dataValues.isNewUser = true;
          done(null, user);
        } catch (err) {
          console.error("Facebook OAuth Error:", err.message);
          done(err);
        }
      },
    ),
  );
  console.log("[Passport] Facebook OAuth aktif");
} else {
  console.log("[Passport] Facebook OAuth tidak dikonfigurasi");
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID !== "xxx") {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `github_${profile.id}@github.com`;

          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "github" },
            include: [{ model: Membership, as: "membership" }],
          });

          if (user) {
            user.dataValues.isNewUser = false;
            return done(null, user);
          }

          const existingUserByEmail = await User.findOne({
            where: { email: email },
            include: [{ model: Membership, as: "membership" }],
          });

          if (existingUserByEmail) {
            existingUserByEmail.dataValues.needLinkAccount = true;
            existingUserByEmail.dataValues.newProvider = "github";
            existingUserByEmail.dataValues.newProviderId = profile.id;
            existingUserByEmail.dataValues.existingProvider =
              existingUserByEmail.auth_provider;
            existingUserByEmail.dataValues.newAvatarUrl =
              profile.photos?.[0]?.value || null;
            return done(null, existingUserByEmail);
          }

          user = await User.create({
            email: email,
            full_name: profile.displayName || profile.username,
            avatar_url: profile.photos?.[0]?.value || null,
            auth_provider: "github",
            provider_id: profile.id,
            membership_id: null,
          });

          user.dataValues.isNewUser = true;
          done(null, user);
        } catch (err) {
          console.error("GitHub OAuth Error:", err.message);
          done(err);
        }
      },
    ),
  );
  console.log("[Passport] GitHub OAuth aktif");
} else {
  console.log("[Passport] GitHub OAuth tidak dikonfigurasi");
}

module.exports = passport;
