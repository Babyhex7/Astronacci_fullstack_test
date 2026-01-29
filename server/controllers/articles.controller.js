const { Article, UserContentHistory } = require("../models");
const { Op } = require("sequelize");

exports.getAllArticles = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereClause = {};

    if (search && search.trim()) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category && category !== "all" && category.trim()) {
      whereClause.category = category;
    }

    const articles = await Article.findAll({
      where: whereClause,
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

exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    const isNewAccess =
      req.accessInfo && req.accessInfo.alreadyAccessed !== true;

    if (isNewAccess) {
      await UserContentHistory.create({
        user_id: userId,
        content_type: "article",
        content_id: parseInt(id),
      });
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
