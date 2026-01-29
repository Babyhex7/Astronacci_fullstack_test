// Halaman Register
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { register as registerAPI } from "../services/authService";
import Button from "../components/common/Button";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import {
  FiMail,
  FiLock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect otomatis jika sudah login
  useEffect(() => {
    if (isAuthenticated && user) {
      const hasMembership = user?.membership_id || user?.membership;
      if (hasMembership) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/select-membership", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await registerAPI(email, password, fullName);
      setSuccess(data.message || "Registrasi berhasil! Silakan login.");
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-dark-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <img
                src="/astronacci-logo.svg"
                alt="Astronacci"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-2xl font-bold text-dark-800">
              Daftar Astronacci
            </h1>
            <p className="text-dark-500 mt-2">
              Buat akun untuk akses konten trading
            </p>
          </div>

          {/* Social Login */}
          <SocialLoginButtons mode="register" />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-dark-200" />
            <span className="px-4 text-dark-400 text-sm">atau</span>
            <div className="flex-1 border-t border-dark-200" />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200"
            >
              <FiAlertCircle />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 bg-green-50 text-green-600 p-3 rounded-lg mb-4 border border-green-200"
            >
              <FiCheckCircle />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="email@contoh.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="Minimal 6 karakter"
                />
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-dark-500 mt-6">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              Masuk
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
