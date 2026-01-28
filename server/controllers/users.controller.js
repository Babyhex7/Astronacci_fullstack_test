// Controller Users: Profile, Stats
const { User, Membership, UserContentHistory } = require("../models");

// GET /api/users/profile - Ambil profil user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error getProfile:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil profil", error: err.message });
  }
};

// GET /api/users/stats - Statistik akses konten user
exports.getStats = async (req, res) => {
  const userId = req.user.id;

  try {
    // Ambil user dengan membership
    const user = await User.findByPk(userId, {
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Hitung artikel yang sudah diakses
    const articlesAccessed = await UserContentHistory.count({
      where: { user_id: userId, content_type: "article" },
      distinct: true,
      col: "content_id",
    });

    // Hitung video yang sudah diakses
    const videosAccessed = await UserContentHistory.count({
      where: { user_id: userId, content_type: "video" },
      distinct: true,
      col: "content_id",
    });

    // Limit berdasarkan membership
    const articleLimit = user.membership?.article_limit || 0;
    const videoLimit = user.membership?.video_limit || 0;

    res.json({
      stats: {
        articles: {
          accessed: articlesAccessed,
          limit: articleLimit,
          remaining:
            articleLimit === -1
              ? "Unlimited"
              : Math.max(0, articleLimit - articlesAccessed),
        },
        videos: {
          accessed: videosAccessed,
          limit: videoLimit,
          remaining:
            videoLimit === -1
              ? "Unlimited"
              : Math.max(0, videoLimit - videosAccessed),
        },
      },
      membership: user.membership,
    });
  } catch (err) {
    console.error("Error getStats:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil statistik", error: err.message });
  }
};
