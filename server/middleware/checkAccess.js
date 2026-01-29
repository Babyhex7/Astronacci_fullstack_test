// Middleware cek akses konten berdasarkan membership
const { User, Membership, UserContentHistory } = require("../models");

const checkAccess = (contentType) => {
  return async (req, res, next) => {
    const userId = req.user.id;
    const contentId = parseInt(req.params.id);

    console.log(
      `[CHECK_ACCESS] User ${userId} akses ${contentType} ID: ${contentId}`,
    );

    try {
      // Ambil user beserta membership
      const user = await User.findByPk(userId, {
        include: { model: Membership, as: "membership" },
      });

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      if (!user.membership) {
        return res
          .status(403)
          .json({ message: "Silakan pilih tipe membership terlebih dahulu" });
      }

      console.log(
        `[CHECK_ACCESS] User membership: ${user.membership.type} (${user.membership.name})`,
      );

      // Tipe C = unlimited, langsung lanjut
      if (user.membership.type === "C") {
        console.log(`[CHECK_ACCESS] Premium user - unlimited access`);
        req.accessInfo = { allowed: true, remaining: -1 };
        return next();
      }

      // Cek apakah konten ini sudah pernah diakses
      const alreadyAccessed = await UserContentHistory.findOne({
        where: {
          user_id: userId,
          content_type: contentType,
          content_id: contentId,
        },
      });

      // Jika sudah pernah diakses, tidak hitung lagi
      if (alreadyAccessed) {
        console.log(`[CHECK_ACCESS] Konten sudah pernah diakses sebelumnya`);
        req.accessInfo = { allowed: true, alreadyAccessed: true };
        return next();
      }

      // Hitung jumlah konten unik yang sudah diakses
      const accessedCount = await UserContentHistory.count({
        where: { user_id: userId, content_type: contentType },
        distinct: true,
        col: "content_id",
      });

      // Ambil limit sesuai tipe konten
      const limit =
        contentType === "article"
          ? user.membership.article_limit
          : user.membership.video_limit;

      console.log(
        `[CHECK_ACCESS] Sudah akses: ${accessedCount}/${limit} ${contentType}`,
      );

      // Cek apakah masih bisa akses
      if (accessedCount < limit) {
        console.log(`[CHECK_ACCESS] Akses diizinkan - konten baru`);
        req.accessInfo = {
          allowed: true,
          remaining: limit - accessedCount - 1,
          contentId,
          contentType,
        };
        return next();
      }

      // Limit tercapai
      console.log(`[CHECK_ACCESS] Limit tercapai!`);
      return res.status(403).json({
        message: "Batas akses tercapai untuk tipe membership Anda",
        limit,
        accessed: accessedCount,
      });
    } catch (err) {
      console.error("Error checkAccess:", err);
      return res
        .status(500)
        .json({ message: "Gagal cek akses", error: err.message });
    }
  };
};

module.exports = checkAccess;
