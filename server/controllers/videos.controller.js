// Controller Videos: List, Detail, Akses
const { Video, UserContentHistory } = require("../models");

// GET /api/videos - Ambil semua video
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
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

    // Simpan history akses jika belum pernah
    if (req.accessInfo && !req.accessInfo.alreadyAccessed) {
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
      },
    });
  } catch (err) {
    console.error("Error getVideoById:", err);
    res
      .status(500)
      .json({ message: "Gagal mengambil video", error: err.message });
  }
};
