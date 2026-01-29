import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  getGoogleAuthUrl,
  getFacebookAuthUrl,
} from "../../services/authService";

const SocialLoginButtons = ({ mode = "login" }) => {
  const text = mode === "login" ? "Masuk dengan" : "Daftar dengan";

  return (
    <div className="space-y-3">
      {/* Google */}
      <a
        href={getGoogleAuthUrl()}
        className="flex items-center justify-center space-x-3 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-gray-700">{text} Google</span>
      </a>

      {/* Facebook */}
      <a
        href={getFacebookAuthUrl()}
        className="flex items-center justify-center space-x-3 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FaFacebook className="w-5 h-5" />
        <span>{text} Facebook</span>
      </a>
    </div>
  );
};

export default SocialLoginButtons;
