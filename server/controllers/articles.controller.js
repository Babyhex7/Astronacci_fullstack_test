// Controller Articles: List, Detail, Akses
const { Article, UserContentHistory } = require("../models");

// GET /api/articles - Ambil semua artikel
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({ articles });
  } catch (err) {
    console.error("Error getAllArticles:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil artikel", error: err.message });
  }
};

// GET /api/articles/:id - Detail artikel + cek akses
exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    // Simpan history akses jika ini konten baru (belum pernah diakses)
    // accessInfo.alreadyAccessed = true jika sudah ada di history
    // accessInfo.alreadyAccessed = undefined jika konten baru
    const isNewAccess =
      req.accessInfo && req.accessInfo.alreadyAccessed !== true;

    if (isNewAccess) {
      console.log(`[USAGE] User ${userId} mengakses artikel baru ID: ${id}`);
      await UserContentHistory.create({
        user_id: userId,
        content_type: "article",
        content_id: parseInt(id),
      });
    } else {
      console.log(`[USAGE] User ${userId} mengakses ulang artikel ID: ${id}`);
    }

    res.json({
      article,
      accessInfo: {
        remaining: req.accessInfo?.remaining,
        isNewAccess,
      },
    });
  } catch (err) {
    console.error("Error getArticleById:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil artikel", error: err.message });
  }
};
