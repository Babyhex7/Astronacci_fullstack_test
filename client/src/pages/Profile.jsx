// Halaman Profile
import { useAuth } from "../context/AuthContext";
import Badge from "../components/common/Badge";
import { FiUser, FiMail, FiAward, FiCalendar } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  // Info membership
  const getMembershipInfo = () => {
    const type = user?.membership?.type || "A";
    const info = {
      A: { name: "Free", color: "default", articles: 3, videos: 3 },
      B: { name: "Basic", color: "primary", articles: 10, videos: 10 },
      C: {
        name: "Premium",
        color: "warning",
        articles: "Unlimited",
        videos: "Unlimited",
      },
    };
    return info[type] || info.A;
  };

  const membershipInfo = getMembershipInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FiUser className="w-10 h-10 text-primary-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.full_name || "User"}
              </h2>
              <Badge
                variant={
                  user?.auth_provider === "google"
                    ? "success"
                    : user?.auth_provider === "facebook"
                      ? "primary"
                      : "default"
                }
              >
                {user?.auth_provider === "google" && "🔵 Google"}
                {user?.auth_provider === "facebook" && "🔵 Facebook"}
                {user?.auth_provider === "local" && "📧 Email"}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <FiMail className="w-5 h-5" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <FiCalendar className="w-5 h-5" />
              <span>
                Bergabung{" "}
                {new Date(user?.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FiAward className="w-8 h-8" />
            <div>
              <p className="text-primary-100 text-sm">Membership</p>
              <h3 className="text-2xl font-bold">
                Tipe {user?.membership?.type || "A"} - {membershipInfo.name}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3">
              <span>Artikel Analisis</span>
              <span className="font-bold">{membershipInfo.articles}</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3">
              <span>Video Tutorial</span>
              <span className="font-bold">{membershipInfo.videos}</span>
            </div>
          </div>

          <p className="text-primary-100 text-sm mt-6">
            ⚠️ Tipe membership tidak dapat diubah
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
