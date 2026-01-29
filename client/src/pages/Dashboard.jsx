// Halaman Dashboard
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Info membership
  const getMembershipInfo = () => {
    const type = user?.membership?.type || "A";
    const info = {
      A: { name: "Free", color: "default", limit: 3 },
      B: { name: "Basic", color: "primary", limit: 10 },
      C: { name: "Premium", color: "warning", limit: -1 },
    };
    return info[type] || info.A;
  };

  const membershipInfo = getMembershipInfo();

  if (loading) {
    return <Loader.FullPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Selamat datang, {user?.full_name || "User"}! 👋
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 rounded-lg">
              <FiUser className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Membership</p>
              <p className="text-xl font-bold">
                Tipe {user?.membership?.type || "A"}
              </p>
            </div>
          </div>
          <Badge variant={membershipInfo.color} className="mt-3">
            {membershipInfo.name}
          </Badge>
        </div>

        {/* Articles Accessed */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Artikel Dibaca</p>
              <p className="text-xl font-bold">
                {stats?.articlesAccessed || 0}
                <span className="text-sm text-gray-400 font-normal">
                  /{membershipInfo.limit === -1 ? "∞" : membershipInfo.limit}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Videos Watched */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiPlay className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Video Ditonton</p>
              <p className="text-xl font-bold">
                {stats?.videosAccessed || 0}
                <span className="text-sm text-gray-400 font-normal">
                  /{membershipInfo.limit === -1 ? "∞" : membershipInfo.limit}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Total Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Konten</p>
              <p className="text-xl font-bold">
                {(stats?.articlesAccessed || 0) + (stats?.videosAccessed || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Articles */}
        <Link
          to="/articles"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <FiFileText className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Artikel Analisis</h3>
          <p className="text-blue-100">
            Baca analisis market, saham, crypto, dan forex terbaru
          </p>
        </Link>

        {/* Videos */}
        <Link
          to="/videos"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <FiPlay className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Video Tutorial</h3>
          <p className="text-green-100">
            Pelajari teknik trading dari video tutorial lengkap
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      {stats?.recentHistory && stats.recentHistory.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Aktivitas Terakhir
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Konten
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Tipe
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.recentHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-gray-800">
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
                        {item.content_type === "article" ? "Artikel" : "Video"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(item.accessed_at).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
