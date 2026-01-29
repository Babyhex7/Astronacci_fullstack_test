// Protected Route: redirect ke login jika belum auth
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
  if (
    user &&
    !user.membership_id &&
    location.pathname !== "/select-membership"
  ) {
    return <Navigate to="/select-membership" replace />;
  }

  return children;
};

export default ProtectedRoute;
