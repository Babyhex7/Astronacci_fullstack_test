// Halaman Dashboard - SECURE VERSION
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getStats } from "../services/userService";
import Loader from "../components/common/Loader";
import Badge from "../components/common/Badge";
import { FiFileText, FiPlay, FiTrendingUp, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch statistik saat mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Info membership (prefer data dari stats API, fallback user)
  const membership = stats?.membership || user?.membership;
  const getMembershipInfo = () => {
    const type = membership?.type || "A";
    const info = {
      A: { name: "Free", color: "default-solid", limit: 3 },
      B: { name: "Basic", color: "primary-solid", limit: 10 },
      C: { name: "Premium", color: "warning-solid", limit: -1 },
    };
    return info[type] || info.A;
  };

  const membershipInfo = getMembershipInfo();
  const articleAccessed = stats?.stats?.articles?.accessed ?? 0;
  const videoAccessed = stats?.stats?.videos?.accessed ?? 0;
  const articleLimit =
    stats?.stats?.articles?.limit ??
    membership?.article_limit ??
    membershipInfo.limit;
  const videoLimit =
    stats?.stats?.videos?.limit ??
    membership?.video_limit ??
    membershipInfo.limit;

  // Animasi
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
        {stats?.recentHistory && stats.recentHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-dark-800 mb-4">
              Aktivitas Terakhir
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden">
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
                      Waktu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-100">
                  {stats.recentHistory.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-dark-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-dark-700 font-medium">
                        {item.content?.title || "-"}
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
                      <td className="px-6 py-4 text-dark-400 text-sm">
                        {new Date(item.accessed_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
