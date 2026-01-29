// Controller Videos: List, Detail, Akses
const { Video, UserContentHistory } = require("../models");
const { Op } = require("sequelize");

// GET /api/videos - Ambil semua video dengan filter dan search
exports.getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereClause = {};

    // Filter berdasarkan search (title atau description)
    if (search && search.trim()) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter berdasarkan category
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

// GET /api/videos/:id - Detail video + cek akses
exports.getVideoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: "Video tidak ditemukan" });
    }

    // Simpan history akses jika ini konten baru (belum pernah diakses)
    // accessInfo.alreadyAccessed = true jika sudah ada di history
    // accessInfo.alreadyAccessed = undefined jika konten baru
    const isNewAccess =
      req.accessInfo && req.accessInfo.alreadyAccessed !== true;

    if (isNewAccess) {
      console.log(`[USAGE] User ${userId} mengakses video baru ID: ${id}`);
      await UserContentHistory.create({
        user_id: userId,
        content_type: "video",
        content_id: parseInt(id),
      });
    } else {
      console.log(`[USAGE] User ${userId} mengakses ulang video ID: ${id}`);
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
