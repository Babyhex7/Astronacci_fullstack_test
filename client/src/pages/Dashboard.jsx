import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getStats, getContentHistory } from "../services/userService";
import { getMembershipInfo } from "../utils/constants";
import Loader from "../components/common/Loader";
import Badge from "../components/common/Badge";
import {
  FiFileText,
  FiPlay,
  FiTrendingUp,
  FiUser,
  FiClock,
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getContentHistory({ limit: 10 });
      setRecentHistory(data.history || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStats(), fetchHistory()]);
      setLoading(false);
    };
    loadData();
  }, [fetchStats, fetchHistory]);

  const membership = stats?.membership || user?.membership;
  const membershipInfo = getMembershipInfo(membership?.type);
  const articleAccessed = stats?.stats?.articles?.accessed ?? 0;
  const videoAccessed = stats?.stats?.videos?.accessed ?? 0;
  const articleLimit =
    stats?.stats?.articles?.limit ??
    membership?.article_limit ??
    membershipInfo.articles;
  const videoLimit =
    stats?.stats?.videos?.limit ??
    membership?.video_limit ??
    membershipInfo.videos;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <Loader.FullPage />;
  }

  return (
    <div className="min-h-screen bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-dark-800">Dashboard</h1>
          <p className="text-dark-500 mt-1">
            Selamat datang, {user?.full_name || "User"}!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {/* User Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-6 border border-dark-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl">
                <FiUser className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Membership</p>
                <p className="text-xl font-bold text-dark-800">
                  Tipe {membership?.type || "A"}
                </p>
              </div>
            </div>
            <Badge variant={membershipInfo.color} className="mt-3">
              {membershipInfo.name}
            </Badge>
          </motion.div>

          {/* Articles Accessed */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-6 border border-dark-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl">
                <FiFileText className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Artikel Dibaca</p>
                <p className="text-xl font-bold text-dark-800">
                  {articleAccessed}
                  <span className="text-sm text-dark-400 font-normal">
                    /{articleLimit === -1 ? "∞" : articleLimit}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Videos Watched */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-6 border border-dark-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-xl">
                <FiPlay className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Video Ditonton</p>
                <p className="text-xl font-bold text-dark-800">
                  {videoAccessed}
                  <span className="text-sm text-dark-400 font-normal">
                    /{videoLimit === -1 ? "∞" : videoLimit}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Total Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-6 border border-dark-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl">
                <FiTrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Total Konten</p>
                <p className="text-xl font-bold text-dark-800">
                  {articleAccessed + videoAccessed}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Articles */}
          <motion.div variants={itemVariants}>
            <Link
              to="/articles"
              className="block bg-white border-2 border-primary-500 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/20 transition-all hover:-translate-y-1 hover:border-primary-600"
            >
              <FiFileText className="w-10 h-10 mb-4 text-primary-500" />
              <h3 className="text-xl font-bold mb-2 text-dark-800">
                Artikel Analisis
              </h3>
              <p className="text-dark-600">
                Baca analisis market, saham, crypto, dan forex terbaru
              </p>
            </Link>
          </motion.div>

          {/* Videos */}
          <motion.div variants={itemVariants}>
            <Link
              to="/videos"
              className="block bg-white border-2 border-secondary-500 rounded-2xl p-6 hover:shadow-xl hover:shadow-secondary-500/20 transition-all hover:-translate-y-1 hover:border-secondary-600"
            >
              <FiPlay className="w-10 h-10 mb-4 text-secondary-500" />
              <h3 className="text-xl font-bold mb-2 text-dark-800">
                Video Tutorial
              </h3>
              <p className="text-dark-600">
                Pelajari teknik trading dari video tutorial lengkap
              </p>
            </Link>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        {recentHistory && recentHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-dark-800">
                Konten Yang Sudah Dilihat
              </h2>
              <span className="text-sm text-dark-400">
                {recentHistory.length} konten terakhir
              </span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">
                        Konten
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">
                        Tipe
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">
                        Kategori
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">
                        <div className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          Waktu Akses
                        </div>
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100">
                    {recentHistory.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-dark-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {item.content?.thumbnail_url && (
                              <img
                                src={item.content.thumbnail_url}
                                alt={item.content?.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <span className="text-dark-700 font-medium line-clamp-1">
                              {item.content?.title || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              item.content_type === "article"
                                ? "primary"
                                : "success"
                            }
                          >
                            {item.content_type === "article"
                              ? "Artikel"
                              : "Video"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-dark-500 text-sm">
                          {item.content?.category || "-"}
                        </td>
                        <td className="px-6 py-4 text-dark-400 text-sm">
                          {new Date(item.accessed_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/${item.content_type === "article" ? "articles" : "videos"}/${item.content_id}`}
                            className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                          >
                            Lihat Lagi
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State for History */}
        {recentHistory && recentHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-dark-800 mb-4">
              Konten Yang Sudah Dilihat
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-dark-100 p-8 text-center">
              <FiFileText className="w-12 h-12 mx-auto text-dark-300 mb-3" />
              <p className="text-dark-500">Belum ada konten yang dilihat</p>
              <p className="text-dark-400 text-sm mt-1">
                Mulai jelajahi artikel dan video untuk melihat history di sini
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Link
                  to="/articles"
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  Lihat Artikel →
                </Link>
                <Link
                  to="/videos"
                  className="text-secondary-500 hover:text-secondary-600 font-medium"
                >
                  Lihat Video →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
