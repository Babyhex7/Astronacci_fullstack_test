// Halaman Login
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { login as loginAPI, getMe } from "../services/authService";
import Button from "../components/common/Button";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import Loader from "../components/common/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect setelah login
  const from = location.state?.from?.pathname || "/dashboard";

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

  // Handle OAuth token dari URL (jika redirect kesini dengan token)
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      console.log("[Login] OAuth token ditemukan, redirect...");
      setOauthLoading(true);
      // Hapus token dari URL
      searchParams.delete("token");
      setSearchParams(searchParams, { replace: true });
      // Simpan token dan fetch user
      localStorage.setItem("token", token);
      getMe()
        .then((data) => {
          login(token, data.user);
          // Navigate akan ditangani oleh useEffect di atas
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Gagal memuat data user");
          setOauthLoading(false);
        });
    }
  }, [searchParams, setSearchParams, login]);

  // Cek OAuth error dari URL
  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError === "oauth_failed") {
      setError(
        "Login dengan OAuth gagal. Silakan coba lagi atau gunakan email.",
      );
    }
  }, [searchParams]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAPI(email, password);
      login(data.token, data.user);

      // Cek perlu select membership
      if (data.user.needSelectMembership) {
        navigate("/select-membership");
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  // Show loader saat OAuth processing
  if (oauthLoading) {
    return <Loader.FullPage />;
  }

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
              Masuk ke Astronacci
            </h1>
            <p className="text-dark-500 mt-2">
              Akses konten trading dan research
            </p>
          </div>

          {/* Social Login */}
          <SocialLoginButtons mode="login" />

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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full pl-10 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-dark-500 mt-6">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
