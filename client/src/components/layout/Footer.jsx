// Komponen Footer
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="relative mt-8">
      {/* Dark corners - kiri atas dan kanan atas */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-dark-900"></div>
      <div className="absolute top-0 right-0 w-12 h-12 bg-dark-900"></div>

      <footer className="bg-dark-900 text-dark-300 py-12 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <img
                    src="/astronacci-logo.svg"
                    alt="Astronacci"
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-xl font-bold text-primary-400">
                  Astronacci
                </span>
              </div>
              <p className="text-sm text-dark-400 max-w-sm leading-relaxed">
                Platform edukasi trading dan research saham terbaik di
                Indonesia. Pelajari strategi trading dari para profesional.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Menu</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/articles"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    Artikel Analisis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/videos"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    Video Tutorial
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Kontak</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2 text-dark-400">
                  <FiMail className="w-4 h-4 text-primary-500" />
                  <span>info@astronacci.com</span>
                </li>
                <li className="flex items-center space-x-2 text-dark-400">
                  <FiPhone className="w-4 h-4 text-primary-500" />
                  <span>+62 812-xxxx-xxxx</span>
                </li>
                <li className="flex items-center space-x-2 text-dark-400">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-dark-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-dark-500">
            <p>
              &copy; 2026 Astronacci Trading + Research. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
