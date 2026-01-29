// Protected Route: redirect ke login jika belum auth
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Izinkan halaman melanjutkan jika membawa token di URL (OAuth redirect)
  const hasTokenInUrl = new URLSearchParams(location.search).has("token");

  // Tampilkan loader saat cek auth
  if (loading && !hasTokenInUrl) {
    return <Loader.FullPage />;
  }

  // Redirect ke login jika belum auth
  if (!isAuthenticated && !hasTokenInUrl) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect ke select-membership jika belum pilih tipe
  // Cek membership_id ATAU membership object (karena API bisa return salah satu)
  const hasMembership = user?.membership_id || user?.membership;
  if (!hasTokenInUrl) {
    if (user && !hasMembership && location.pathname !== "/select-membership") {
      return <Navigate to="/select-membership" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
