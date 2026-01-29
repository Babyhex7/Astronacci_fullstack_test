// Middleware verifikasi JWT Token - SECURE VERSION
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Prioritas: Cookie (secure) > Authorization header (backward compatibility)
  let token = req.cookies?.auth_token;

  // Fallback ke Authorization header jika cookie tidak ada
  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"
  }

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user ke request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
};

module.exports = authMiddleware;
