// Halaman Profile - Modern Clean Design
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiFileText,
  FiPlay,
  FiAward,
} from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  // Info membership
  const getMembershipInfo = () => {
    const type = user?.membership?.type || "A";
    const info = {
      A: { name: "Gratis", color: "bg-dark-500", articles: 3, videos: 3 },
      B: { name: "Basic", color: "bg-primary-500", articles: 10, videos: 10 },
      C: {
        name: "Premium",
        color: "bg-secondary-500",
        articles: "Unlimited",
        videos: "Unlimited",
      },
    };
    return info[type] || info.A;
  };

  const membershipInfo = getMembershipInfo();

  // Auth provider display
  const getProviderInfo = () => {
    if (user?.auth_provider === "google")
      return { name: "Google", color: "text-green-600", icon: "G" };
    if (user?.auth_provider === "facebook")
      return { name: "Facebook", color: "text-blue-600", icon: "F" };
    return { name: "Email", color: "text-dark-600", icon: "E" };
  };

  const providerInfo = getProviderInfo();

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header */}
      <div className="bg-white border-b border-dark-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-dark-800">Profil Akun</h1>
          <p className="text-dark-500 mt-1">
            Kelola informasi akun dan keanggotaan Anda
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-dark-200 p-8">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl border-2 border-dark-200 overflow-hidden flex items-center justify-center bg-dark-50">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-12 h-12 text-dark-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-dark-800 mb-2">
                    {user?.full_name || "Pengguna"}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-sm font-medium ${providerInfo.color}`}
                    >
                      Login via {providerInfo.name}
                    </span>
                    <span className="text-dark-300">•</span>
                    <span
                      className={`px-3 py-1 ${membershipInfo.color} text-white rounded-lg text-xs font-semibold`}
                    >
                      Member {membershipInfo.name}
                    </span>
                  </div>

                  {/* Info Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-dark-50 rounded-lg flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-dark-600" />
                      </div>
                      <div>
                        <p className="text-xs text-dark-400 font-medium">
                          Alamat Email
                        </p>
                        <p className="text-sm text-dark-700 font-medium">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-dark-50 rounded-lg flex items-center justify-center">
                        <FiCalendar className="w-5 h-5 text-dark-600" />
                      </div>
                      <div>
                        <p className="text-xs text-dark-400 font-medium">
                          Bergabung Sejak
                        </p>
                        <p className="text-sm text-dark-700 font-medium">
                          {user?.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )
                            : "Tidak tersedia"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Limits */}
            <div className="bg-white rounded-2xl shadow-sm border border-dark-200 p-8">
              <h3 className="text-lg font-bold text-dark-800 mb-6">
                Batas Akses Konten
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Articles */}
                <div className="p-6 bg-dark-50 rounded-xl border border-dark-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                      <FiFileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-dark-500 font-medium">
                        Artikel Analisis
                      </p>
                      <p className="text-3xl font-bold text-dark-800">
                        {membershipInfo.articles}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-dark-200">
                    <span className="text-xs text-dark-400">Per bulan</span>
                    <span className="text-xs font-semibold text-primary-600">
                      Aktif
                    </span>
                  </div>
                </div>

                {/* Videos */}
                <div className="p-6 bg-dark-50 rounded-xl border border-dark-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center">
                      <FiPlay className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-dark-500 font-medium">
                        Video Tutorial
                      </p>
                      <p className="text-3xl font-bold text-dark-800">
                        {membershipInfo.videos}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-dark-200">
                    <span className="text-xs text-dark-400">Per bulan</span>
                    <span className="text-xs font-semibold text-secondary-600">
                      Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Membership Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-dark-200 p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-dark-400 font-medium">
                    Paket Keanggotaan
                  </p>
                  <h3 className="text-lg font-bold text-dark-800">
                    {user?.membership?.type || "A"}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-dark-100">
                  <span className="text-sm text-dark-600">Tipe</span>
                  <span className="text-sm font-bold text-dark-800">
                    {user?.membership?.type || "A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-dark-100">
                  <span className="text-sm text-dark-600">Status</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-green-50 text-green-700 rounded-lg">
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-dark-600">Artikel</span>
                  <span className="text-sm font-bold text-dark-800">
                    {membershipInfo.articles}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-dark-600">Video</span>
                  <span className="text-sm font-bold text-dark-800">
                    {membershipInfo.videos}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-dark-50 rounded-xl border border-dark-200">
                <p className="text-xs text-dark-600 leading-relaxed">
                  <span className="font-semibold text-dark-800">Catatan:</span>{" "}
                  Tipe keanggotaan bersifat permanen dan tidak dapat diubah
                  setelah pendaftaran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
