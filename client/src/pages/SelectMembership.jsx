import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { selectMembership } from "../services/authService";
import Button from "../components/common/Button";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const SelectMembership = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const memberships = [
    {
      type: "A",
      name: "Free",
      price: "Gratis",
      description: "Cocok untuk pemula",
      articles: 3,
      videos: 3,
      color: "border-dark-200 hover:border-dark-400",
      selected: "border-dark-500 bg-dark-50 ring-2 ring-dark-500",
    },
    {
      type: "B",
      name: "Basic",
      price: "Rp 99K/bln",
      description: "Untuk trader aktif",
      articles: 10,
      videos: 10,
      color: "border-primary-200 hover:border-primary-400",
      selected: "border-primary-500 bg-primary-50 ring-2 ring-primary-500",
      popular: true,
    },
    {
      type: "C",
      name: "Premium",
      price: "Rp 199K/bln",
      description: "Full akses tanpa batas",
      articles: "Unlimited",
      videos: "Unlimited",
      color: "border-secondary-200 hover:border-secondary-400",
      selected:
        "border-secondary-500 bg-secondary-50 ring-2 ring-secondary-500",
    },
  ];

  const handleSubmit = async () => {
    if (!selected) return;

    setLoading(true);
    setError("");

    try {
      const data = await selectMembership(selected);
      updateUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memilih membership");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-fit mx-auto mb-4 px-4 py-2 rounded-xl bg-dark-50 border border-dark-100">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Astronacci
            </span>
          </div>
          <h1 className="text-3xl font-bold text-dark-800">
            Pilih Tipe Membership
          </h1>
          <p className="text-dark-500 mt-2">
            Pilih sekali saat mendaftar dan tidak bisa diubah
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 p-3 rounded-xl mb-6 border border-red-200"
          >
            <FiAlertCircle />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Membership Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {memberships.map((m) => (
            <motion.div
              key={m.type}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(m.type)}
              className={`
                relative bg-white rounded-2xl shadow-md border-2 p-6 cursor-pointer transition-all
                ${selected === m.type ? m.selected : m.color}
              `}
            >
              {/* Popular badge */}
              {m.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                <span className="inline-block px-3 py-1 rounded-full bg-dark-100 text-dark-600 text-sm font-medium">
                  Tipe {m.type}
                </span>
                <h3 className="text-2xl font-bold text-dark-800 mt-3">
                  {m.name}
                </h3>
                <p className="text-xl font-bold text-primary-500 mt-1">
                  {m.price}
                </p>
                <p className="text-dark-400 text-sm mt-1">{m.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-dark-600">
                    {m.articles} Artikel Analisis
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-dark-600">
                    {m.videos} Video Tutorial
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-dark-600">Akses Dashboard</span>
                </li>
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={handleSubmit}
            disabled={!selected || loading}
            size="lg"
          >
            {loading ? "Memproses..." : "Konfirmasi Pilihan"}
          </Button>
          <p className="text-sm text-dark-400 mt-4">
            Tipe membership tidak bisa diubah setelah dipilih
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectMembership;
