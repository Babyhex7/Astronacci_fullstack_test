import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader.FullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasMembership = user?.membership_id || user?.membership;
  if (user && !hasMembership && location.pathname !== "/select-membership") {
    return <Navigate to="/select-membership" replace />;
  }

  return children;
};

export default ProtectedRoute;
