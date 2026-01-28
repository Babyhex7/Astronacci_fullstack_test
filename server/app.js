// Setup Express app utama
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const routes = require("./routes");
const { sequelize } = require("./models");

const app = express();

// Middleware dasar
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session untuk OAuth
app.use(
  session({
    secret: process.env.JWT_SECRET || "rahasia-astronacci",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set true jika pakai HTTPS
  }),
);

// Inisialisasi Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// Route utama
app.use("/api", routes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Astronacci Trading API berjalan!" });
});

// Sync database (development only)
if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ alter: false })
    .then(() => console.log("✅ Database tersinkronisasi"))
    .catch((err) => console.error("❌ Gagal sync database:", err));
}

module.exports = app;
