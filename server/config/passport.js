const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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
          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "google" },
            include: [{ model: Membership, as: "membership" }],
          });

          const isNewUser = !user;
          if (!user) {
            user = await User.create({
              email: profile.emails[0].value,
              full_name: profile.displayName,
              avatar_url: profile.photos?.[0]?.value || null,
              auth_provider: "google",
              provider_id: profile.id,
              membership_id: null,
            });
          }

          user.dataValues.isNewUser = isNewUser;
          done(null, user);
        } catch (err) {
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
          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "facebook" },
            include: [{ model: Membership, as: "membership" }],
          });

          const isNewUser = !user;
          if (!user) {
            user = await User.create({
              email:
                profile.emails?.[0]?.value || `fb_${profile.id}@facebook.com`,
              full_name: profile.displayName,
              avatar_url: profile.photos?.[0]?.value || null,
              auth_provider: "facebook",
              provider_id: profile.id,
              membership_id: null,
            });
          }

          user.dataValues.isNewUser = isNewUser;
          done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  console.log("[Passport] Facebook OAuth aktif");
} else {
  console.log("[Passport] Facebook OAuth tidak dikonfigurasi");
}

module.exports = passport;
