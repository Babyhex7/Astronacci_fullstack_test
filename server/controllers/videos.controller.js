const { Video, UserContentHistory } = require("../models");
const { Op } = require("sequelize");

exports.getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereClause = {};

    if (search && search.trim()) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category && category !== "all" && category.trim()) {
      whereClause.category = category;
    }

    const videos = await Video.findAll({
      where: whereClause,
      order: [["created_at", "DESC"]],
    });

    res.json({ videos });
  } catch (err) {
    console.error("Error getAllVideos:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil video", error: err.message });
  }
};

exports.getVideoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: "Video tidak ditemukan" });
    }

    const isNewAccess =
      req.accessInfo && req.accessInfo.alreadyAccessed !== true;

    if (isNewAccess) {
      await UserContentHistory.create({
        user_id: userId,
        content_type: "video",
        content_id: parseInt(id),
      });
    }

    res.json({
      video,
      accessInfo: {
        remaining: req.accessInfo?.remaining,
        isNewAccess,
      },
    });
  } catch (err) {
    console.error("Error getVideoById:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil video", error: err.message });
  }
};
