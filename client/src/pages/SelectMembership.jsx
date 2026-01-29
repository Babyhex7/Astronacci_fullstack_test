// Halaman Pilih Membership
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { selectMembership, getMe } from "../services/authService";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const SelectMembership = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initializing, setInitializing] = useState(true);

  const { login, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Cek token dari OAuth callback
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Fetch user data
      getMe()
        .then((data) => {
          updateUser(data.user);
          setInitializing(false);
        })
        .catch(() => {
          setInitializing(false);
        });
    } else {
      setInitializing(false);
    }
  }, [searchParams, updateUser]);

  // Data tipe membership
  const memberships = [
    {
      type: "A",
      name: "Free",
      description: "Cocok untuk pemula",
      articles: 3,
      videos: 3,
      color: "border-gray-300 hover:border-gray-400",
      selected: "border-gray-500 bg-gray-50",
    },
    {
      type: "B",
      name: "Basic",
      description: "Untuk trader aktif",
      articles: 10,
      videos: 10,
      color: "border-primary-300 hover:border-primary-400",
      selected: "border-primary-500 bg-primary-50",
      popular: true,
    },
    {
      type: "C",
      name: "Premium",
      description: "Full akses tanpa batas",
      articles: "Unlimited",
      videos: "Unlimited",
      color: "border-yellow-300 hover:border-yellow-400",
      selected: "border-yellow-500 bg-yellow-50",
    },
  ];

  // Handle submit
  const handleSubmit = async () => {
    if (!selected) return;

    setLoading(true);
    setError("");

    try {
      const data = await selectMembership(selected);
      updateUser(data.user);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memilih membership");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return <Loader.FullPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Pilih Tipe Membership
          </h1>
          <p className="text-gray-600 mt-2">
            Pilih sekali saat mendaftar dan tidak bisa diubah
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 p-3 rounded-lg mb-6">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {memberships.map((m) => (
            <div
              key={m.type}
              onClick={() => setSelected(m.type)}
              className={`
                relative bg-white rounded-xl shadow-md border-2 p-6 cursor-pointer transition-all
                ${selected === m.type ? m.selected : m.color}
              `}
            >
              {/* Popular badge */}
              {m.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm">
                  Populer
                </span>
              )}

              {/* Selected indicator */}
              {selected === m.type && (
                <div className="absolute top-4 right-4">
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold">Tipe {m.type}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  {m.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">{m.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>{m.articles} Artikel Analisis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>{m.videos} Video Tutorial</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>Akses Dashboard</span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selected || loading}
            size="lg"
          >
            {loading ? "Memproses..." : "Konfirmasi Pilihan"}
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            ⚠️ Tipe membership tidak bisa diubah setelah dipilih
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectMembership;
