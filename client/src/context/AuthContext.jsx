// Context untuk Auth state management
import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/authService";

// Buat context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek token saat mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Cek autentikasi dari token
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMe();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // Token invalid, hapus
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Login: simpan token & set user
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout: hapus token & reset state
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user (setelah select membership)
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook untuk akses auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};

export default AuthContext;
