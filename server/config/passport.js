// Konfigurasi Passport (Google & Facebook OAuth)
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User, Membership } = require("../models");
require("dotenv").config();

// Serialize user ke session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user dari session
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

// Google OAuth Strategy - hanya aktif jika credentials tersedia
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
          // Cari user berdasarkan provider_id (include membership untuk cek)
          let user = await User.findOne({
            where: { provider_id: profile.id, auth_provider: "google" },
            include: [{ model: Membership, as: "membership" }],
          });

          // Jika belum ada, buat user baru (tanpa membership, pilih nanti)
          const isNewUser = !user;
          if (!user) {
            user = await User.create({
              email: profile.emails[0].value,
              full_name: profile.displayName,
              avatar_url: profile.photos?.[0]?.value || null,
              auth_provider: "google",
              provider_id: profile.id,
              membership_id: null, // Belum pilih tipe
            });
          }

          console.log(
            `[OAuth Google] User: ${user.email}, membership_id: ${user.membership_id}`,
          );

          // Tambah flag untuk cek apakah user baru
          user.dataValues.isNewUser = isNewUser;
          done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  console.log("✅ Google OAuth Strategy aktif");
} else {
  console.log("⚠️ Google OAuth tidak dikonfigurasi (GOOGLE_CLIENT_ID kosong)");
}

// Facebook OAuth Strategy - hanya aktif jika credentials tersedia
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
          // Cari user dengan include membership
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

          console.log(
            `[OAuth Facebook] User: ${user.email}, membership_id: ${user.membership_id}`,
          );

          user.dataValues.isNewUser = isNewUser;
          done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );
  console.log("✅ Facebook OAuth Strategy aktif");
} else {
  console.log(
    "⚠️ Facebook OAuth tidak dikonfigurasi (FACEBOOK_APP_ID kosong/xxx)",
  );
}

module.exports = passport;
