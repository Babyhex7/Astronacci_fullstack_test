const {
  User,
  Membership,
  UserContentHistory,
  Article,
  Video,
} = require("../models");

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

exports.getStats = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      include: { model: Membership, as: "membership" },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const articlesAccessed = await UserContentHistory.count({
      where: { user_id: userId, content_type: "article" },
      distinct: true,
      col: "content_id",
    });

    const videosAccessed = await UserContentHistory.count({
      where: { user_id: userId, content_type: "video" },
      distinct: true,
      col: "content_id",
    });

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

// Get content history - artikel dan video yang sudah dilihat user
exports.getContentHistory = async (req, res) => {
  const userId = req.user.id;
  const { type, limit = 50 } = req.query;

  try {
    const whereClause = { user_id: userId };
    if (type && (type === "article" || type === "video")) {
      whereClause.content_type = type;
    }

    const history = await UserContentHistory.findAll({
      where: whereClause,
      order: [["accessed_at", "DESC"]],
      limit: parseInt(limit),
    });

    // Get unique content IDs
    const articleIds = [
      ...new Set(
        history
          .filter((h) => h.content_type === "article")
          .map((h) => h.content_id),
      ),
    ];
    const videoIds = [
      ...new Set(
        history
          .filter((h) => h.content_type === "video")
          .map((h) => h.content_id),
      ),
    ];

    // Fetch articles and videos
    const [articles, videos] = await Promise.all([
      articleIds.length > 0
        ? Article.findAll({ where: { id: articleIds } })
        : [],
      videoIds.length > 0 ? Video.findAll({ where: { id: videoIds } }) : [],
    ]);

    // Create lookup maps
    const articleMap = {};
    articles.forEach((a) => {
      articleMap[a.id] = a;
    });
    const videoMap = {};
    videos.forEach((v) => {
      videoMap[v.id] = v;
    });

    // Combine history with content details
    const historyWithContent = history.map((h) => ({
      id: h.id,
      content_type: h.content_type,
      content_id: h.content_id,
      accessed_at: h.accessed_at,
      content:
        h.content_type === "article"
          ? articleMap[h.content_id]
          : videoMap[h.content_id],
    }));

    res.json({
      history: historyWithContent,
      summary: {
        totalArticles: articleIds.length,
        totalVideos: videoIds.length,
      },
    });
  } catch (err) {
    console.error("Error getContentHistory:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil history konten", error: err.message });
  }
};

// Get IDs of viewed content (untuk marking di list)
exports.getViewedContentIds = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await UserContentHistory.findAll({
      where: { user_id: userId },
      attributes: ["content_type", "content_id"],
      group: ["content_type", "content_id"],
    });

    const viewedArticleIds = history
      .filter((h) => h.content_type === "article")
      .map((h) => h.content_id);
    const viewedVideoIds = history
      .filter((h) => h.content_type === "video")
      .map((h) => h.content_id);

    res.json({
      articles: viewedArticleIds,
      videos: viewedVideoIds,
    });
  } catch (err) {
    console.error("Error getViewedContentIds:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil viewed content", error: err.message });
  }
};
