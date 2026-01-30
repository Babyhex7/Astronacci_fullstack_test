import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { getGoogleAuthUrl, getGithubAuthUrl } from "../../services/authService";

const SocialLoginButtons = ({ mode = "login" }) => {
  const text = mode === "login" ? "Masuk dengan" : "Daftar dengan";
  const [showFacebookNotice, setShowFacebookNotice] = useState(false);

  const handleFacebookClick = (e) => {
    e.preventDefault();
    setShowFacebookNotice(true);
  };

  return (
    <div className="space-y-3">
      {/* Facebook Notice Modal */}
      {showFacebookNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-dark-800">
                  Facebook Login
                </h3>
              </div>
              <button
                onClick={() => setShowFacebookNotice(false)}
                className="text-dark-400 hover:text-dark-600 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Fitur Segera Hadir</p>
                  <p>
                    Login dengan Facebook sedang dalam proses review oleh Meta
                    dan akan segera tersedia. Silakan gunakan metode login lain
                    untuk saat ini.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-dark-500 text-center">
                Pilih metode login alternatif:
              </p>

              <a
                href={getGoogleAuthUrl()}
                className="flex items-center justify-center space-x-3 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-gray-700">{text} Google</span>
              </a>

              <a
                href={getGithubAuthUrl()}
                className="flex items-center justify-center space-x-3 w-full py-3 px-4 bg-dark-800 text-white rounded-lg hover:bg-dark-900 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
                <span>{text} GitHub</span>
              </a>

              <button
                onClick={() => setShowFacebookNotice(false)}
                className="w-full py-2 text-dark-500 hover:text-dark-700 text-sm transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google */}
      <a
        href={getGoogleAuthUrl()}
        className="flex items-center justify-center space-x-3 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-gray-700">{text} Google</span>
      </a>

      {/* Facebook - Coming Soon */}
      <button
        onClick={handleFacebookClick}
        className="flex items-center justify-center space-x-3 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative"
      >
        <FaFacebook className="w-5 h-5" />
        <span>{text} Facebook</span>
        <span className="absolute right-3 text-xs bg-white/20 px-2 py-0.5 rounded-full">
          Segera
        </span>
      </button>

      {/* GitHub */}
      <a
        href={getGithubAuthUrl()}
        className="flex items-center justify-center space-x-3 w-full py-3 px-4 bg-dark-800 text-white rounded-lg hover:bg-dark-900 transition-colors"
      >
        <FaGithub className="w-5 h-5" />
        <span>{text} GitHub</span>
      </a>
    </div>
  );
};

export default SocialLoginButtons;
