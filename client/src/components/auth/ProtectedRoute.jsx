// Protected Route: redirect ke login jika belum auth - SECURE VERSION
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Tampilkan loader saat cek auth
  if (loading) {
    return <Loader.FullPage />;
  }

  // Redirect ke login jika belum auth
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect ke select-membership jika belum pilih tipe
  // Cek membership_id ATAU membership object (karena API bisa return salah satu)
  const hasMembership = user?.membership_id || user?.membership;
  if (user && !hasMembership && location.pathname !== "/select-membership") {
    return <Navigate to="/select-membership" replace />;
  }

  return children;
};

export default ProtectedRoute;
