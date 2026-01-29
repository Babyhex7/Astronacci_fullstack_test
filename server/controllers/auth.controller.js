// Controller Auth: Register, Login, OAuth, Pilih Membership
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Membership } = require("../models");
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      membershipId: user.membership_id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// POST /api/auth/register - Register manual (step 1)
exports.register = async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    // Cek email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (tanpa membership, pilih nanti)
    const user = await User.create({
      email,
      password: hashedPassword,
      full_name,
      auth_provider: "local",
      membership_id: null,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "Register berhasil, silakan pilih tipe membership",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        needSelectMembership: true,
      },
      token,
    });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ message: "Gagal register", error: err.message });
  }
};

// POST /api/auth/select-membership - Pilih tipe membership (step 2)
exports.selectMembership = async (req, res) => {
  const userId = req.user.id;
  const { membershipType } = req.body; // 'A', 'B', atau 'C'

  try {
    // Cari membership berdasarkan tipe
    const membership = await Membership.findOne({
      where: { type: membershipType },
    });
    if (!membership) {
      return res.status(400).json({ message: "Tipe membership tidak valid" });
    }

    // Cek user sudah punya membership
    const user = await User.findByPk(userId);
    if (user.membership_id) {
      return res
        .status(400)
        .json({ message: "Anda sudah memiliki tipe membership" });
    }

    // Update membership user
    await user.update({ membership_id: membership.id });

    // Generate token baru dengan membership
    const newToken = generateToken({
      ...user.dataValues,
      membership_id: membership.id,
    });

    res.json({
      message: `Berhasil memilih ${membership.name}`,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        membership: membership,
      },
      token: newToken,
    });
  } catch (err) {
    console.error("Error select membership:", err);
    res
      .status(500)
      .json({ message: "Gagal memilih membership", error: err.message });
  }
};

// POST /api/auth/login - Login manual
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user
    const user = await User.findOne({
      where: { email },
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Cek apakah user register via OAuth
    if (user.auth_provider !== "local") {
      return res.status(401).json({
        message: `Akun ini terdaftar via ${user.auth_provider}. Silakan login dengan ${user.auth_provider}.`,
      });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        membership: user.membership,
        needSelectMembership: !user.membership_id,
      },
      token,
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ message: "Gagal login", error: err.message });
  }
};

// GET /api/auth/me - Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({
      user: {
        ...user.toJSON(),
        needSelectMembership: !user.membership_id,
      },
    });
  } catch (err) {
    console.error("Error getMe:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil data user", error: err.message });
  }
};

// OAuth Callback Handler (Google/Facebook)
exports.oauthCallback = (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  // Redirect ke frontend dengan token
  const redirectUrl = user.membership_id
    ? `${process.env.CLIENT_URL}/dashboard?token=${token}`
    : `${process.env.CLIENT_URL}/select-membership?token=${token}&isNew=true`;

  res.redirect(redirectUrl);
};
