// Context untuk Auth state management
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { getMe, logout as logoutService } from "../services/authService";

// Buat context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek autentikasi dari cookie/token (useCallback untuk stabilitas)
  const checkAuth = useCallback(async () => {
    try {
      const data = await getMe();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // Token/cookie invalid - ini normal untuk user yang belum login
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cek token saat mount (hanya sekali)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login: set user (token disimpan di cookie HTTP-only oleh server)
  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Logout: clear cookie di server
  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch (error) {
      console.warn("Logout request gagal", error);
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Update user (setelah select membership)
  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  // Stabilkan value dengan useMemo
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      updateUser,
      checkAuth,
    }),
    [user, loading, isAuthenticated, login, logout, updateUser, checkAuth],
  );

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
