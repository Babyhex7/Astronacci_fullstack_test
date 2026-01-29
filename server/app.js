const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const routes = require("./routes");
const { sequelize } = require("./models");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET || "rahasia-astronacci",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Astronacci Trading API berjalan!" });
});

if (process.env.NODE_ENV !== "production") {
  sequelize
    .sync({ alter: false })
    .then(() => console.log("Database tersinkronisasi"))
    .catch((err) => console.error("Gagal sync database:", err));
}

module.exports = app;
