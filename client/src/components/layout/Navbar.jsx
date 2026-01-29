import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Text Only */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Astronacci
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-dark-600 hover:text-primary-500 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/articles"
                  className="text-dark-600 hover:text-primary-500 transition-colors font-medium"
                >
                  Artikel
                </Link>
                <Link
                  to="/videos"
                  className="text-dark-600 hover:text-primary-500 transition-colors font-medium"
                >
                  Video
                </Link>

                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-dark-600 hover:text-primary-500 font-medium px-3 py-2 rounded-lg hover:bg-dark-50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden lg:inline">
                      {user?.full_name || "User"}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-dark-100"
                      >
                        <div className="px-4 py-3 border-b border-dark-100">
                          <p className="text-sm font-semibold text-dark-800">
                            {user?.full_name}
                          </p>
                          <p className="text-xs text-dark-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2.5 text-dark-600 hover:bg-dark-50 transition-colors"
                        >
                          <FiUser className="w-4 h-4" />
                          <span>Profil Saya</span>
                        </Link>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2.5 text-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-dark-600 hover:text-primary-500 transition-colors font-medium"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-600 transition-all"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-50 transition-colors"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-dark-600" />
            ) : (
              <FiMenu className="w-6 h-6 text-dark-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-dark-600 hover:bg-dark-50 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/articles"
                      className="block px-4 py-3 text-dark-600 hover:bg-dark-50 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Artikel
                    </Link>
                    <Link
                      to="/videos"
                      className="block px-4 py-3 text-dark-600 hover:bg-dark-50 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Video
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-dark-600 hover:bg-dark-50 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profil
                    </Link>
                    <div className="pt-2 border-t border-dark-100 mt-2">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-lg font-medium flex items-center space-x-2"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-dark-600 hover:bg-dark-50 rounded-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-center font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Daftar Sekarang
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
