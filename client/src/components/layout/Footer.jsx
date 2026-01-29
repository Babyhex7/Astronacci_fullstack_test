// Komponen Footer
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark-200 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🚀 Astronacci</h3>
            <p className="text-sm">
              Platform edukasi trading dan research saham terbaik di Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/articles" className="hover:text-primary-400">
                  Artikel Analisis
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-primary-400">
                  Video Tutorial
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <p className="text-sm">Email: info@astronacci.com</p>
            <p className="text-sm">WhatsApp: +62 812-xxxx-xxxx</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Astronacci. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
