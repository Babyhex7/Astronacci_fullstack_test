import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FaGoogle, FaFacebook, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiAlertTriangle, FiLink, FiX } from "react-icons/fi";

const providerIcons = {
  google: FaGoogle,
  facebook: FaFacebook,
  github: FaGithub,
  local: FaEnvelope,
};

const providerNames = {
  google: "Google",
  facebook: "Facebook",
  github: "GitHub",
  local: "Email/Password",
};

const providerColors = {
  google: "text-red-500",
  facebook: "text-blue-600",
  github: "text-dark-800",
  local: "text-dark-600",
};

const LinkAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const newProvider = searchParams.get("newProvider");
  const existingProvider = searchParams.get("existingProvider");
  const newProviderId = searchParams.get("newProviderId");
  const email = searchParams.get("email");
  const newAvatarUrl = searchParams.get("newAvatarUrl");

  const NewProviderIcon = providerIcons[newProvider] || FaEnvelope;
  const ExistingProviderIcon = providerIcons[existingProvider] || FaEnvelope;

  const handleLinkAccount = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/link-account", {
        email,
        newProvider,
        newProviderId,
        newAvatarUrl,
      });

      login(response.data.user);

      if (response.data.user.membership) {
        navigate("/dashboard");
      } else {
        navigate("/select-membership");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menautkan akun");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  if (!newProvider || !existingProvider || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50">
        <div className="text-center">
          <FiAlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-dark-800 mb-2">
            Parameter Tidak Valid
          </h1>
          <p className="text-dark-500 mb-4">
            Halaman ini tidak dapat diakses secara langsung.
          </p>
          <Link
            to="/login"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLink className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-dark-800 mb-2">
              Tautkan Akun
            </h1>
            <p className="text-dark-500">
              Email <strong>{email}</strong> sudah terdaftar dengan provider
              lain
            </p>
          </div>

          <div className="bg-dark-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-white shadow flex items-center justify-center ${providerColors[existingProvider]}`}
                >
                  <ExistingProviderIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-dark-500">Akun Terdaftar</p>
                  <p className="font-semibold text-dark-800">
                    {providerNames[existingProvider]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-2xl">→</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-white shadow flex items-center justify-center ${providerColors[newProvider]}`}
                >
                  <NewProviderIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-dark-500">Akun Baru</p>
                  <p className="font-semibold text-dark-800">
                    {providerNames[newProvider]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Perhatian:</p>
                <p>
                  Jika Anda menautkan akun, metode login Anda akan berubah dari{" "}
                  <strong>{providerNames[existingProvider]}</strong> ke{" "}
                  <strong>{providerNames[newProvider]}</strong>.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleLinkAccount}
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Menautkan...</span>
              ) : (
                <>
                  <FiLink className="w-5 h-5" />
                  <span>Tautkan Akun {providerNames[newProvider]}</span>
                </>
              )}
            </button>

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full py-3 px-4 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FiX className="w-5 h-5" />
              <span>Batalkan</span>
            </button>
          </div>

          <p className="text-center text-sm text-dark-400 mt-6">
            Ingin login dengan {providerNames[existingProvider]}?{" "}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Kembali ke Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LinkAccount;
