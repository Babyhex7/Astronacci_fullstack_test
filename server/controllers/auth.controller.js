const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Membership } = require("../models");
require("dotenv").config();

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

exports.register = async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      full_name,
      auth_provider: "local",
      membership_id: null,
    });

    res.status(201).json({
      message: "Registrasi berhasil! Silakan login untuk melanjutkan.",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ message: "Gagal register", error: err.message });
  }
};

exports.selectMembership = async (req, res) => {
  const userId = req.user.id;
  const { membershipType } = req.body;

  try {
    const membership = await Membership.findOne({
      where: { type: membershipType },
    });
    if (!membership) {
      return res.status(400).json({ message: "Tipe membership tidak valid" });
    }

    const user = await User.findByPk(userId);
    if (user.membership_id) {
      return res
        .status(400)
        .json({ message: "Anda sudah memiliki tipe membership" });
    }

    await user.update({ membership_id: membership.id });

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
        membership_id: membership.id,
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    if (user.auth_provider !== "local") {
      return res.status(401).json({
        message: `Akun ini terdaftar via ${user.auth_provider}. Silakan login dengan ${user.auth_provider}.`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = generateToken(user);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

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

exports.oauthCallback = (req, res) => {
  const user = req.user;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  if (user.dataValues.needLinkAccount) {
    const params = new URLSearchParams({
      newProvider: user.dataValues.newProvider,
      existingProvider: user.dataValues.existingProvider,
      newProviderId: user.dataValues.newProviderId,
      email: user.email,
      newAvatarUrl: user.dataValues.newAvatarUrl || "",
    });
    return res.redirect(`${clientUrl}/link-account?${params.toString()}`);
  }

  const token = generateToken(user);

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  let redirectUrl;
  if (user.dataValues.isNewUser) {
    redirectUrl = `${clientUrl}/select-membership`;
  } else if (user.membership_id) {
    redirectUrl = `${clientUrl}/dashboard`;
  } else {
    redirectUrl = `${clientUrl}/select-membership`;
  }

  res.redirect(redirectUrl);
};

exports.linkAccount = async (req, res) => {
  const { email, newProvider, newProviderId, newAvatarUrl } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    await user.update({
      auth_provider: newProvider,
      provider_id: newProviderId,
      avatar_url: user.avatar_url || newAvatarUrl || null,
    });

    const token = generateToken(user);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.json({
      message: `Akun ${newProvider} berhasil ditautkan`,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        auth_provider: user.auth_provider,
        membership: user.membership,
      },
    });
  } catch (err) {
    console.error("Error linkAccount:", err);
    res
      .status(500)
      .json({ message: "Gagal menautkan akun", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.json({
    message: "Logout berhasil",
    success: true,
  });
};
