// Halaman Home (Landing Page)
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPlay,
  FiFileText,
  FiAward,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const Home = () => {
  // Data tipe membership
  const memberships = [
    {
      type: "A",
      name: "Free",
      price: "Gratis",
      articles: 3,
      videos: 3,
      features: ["3 Artikel Analisis", "3 Video Tutorial", "Akses Dashboard"],
    },
    {
      type: "B",
      name: "Basic",
      price: "Rp 99K/bln",
      articles: 10,
      videos: 10,
      features: [
        "10 Artikel Analisis",
        "10 Video Tutorial",
        "Akses Dashboard",
        "Sinyal Trading",
      ],
      popular: true,
    },
    {
      type: "C",
      name: "Premium",
      price: "Rp 199K/bln",
      articles: "Unlimited",
      videos: "Unlimited",
      features: [
        "Unlimited Artikel",
        "Unlimited Video",
        "Akses Dashboard",
        "Sinyal Trading",
        "Konsultasi 1-on-1",
      ],
    },
  ];

  // Animasi variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Clean White */}
      <section className="relative min-h-[85vh] flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 mb-6 leading-tight"
            >
              Kuasai Seni <span className="text-primary-500">Trading</span>{" "}
              dengan Astronacci
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-dark-500 mb-8 max-w-xl"
            >
              Edukasi trading lengkap dengan analisis market real-time, video
              tutorial eksklusif, dan komunitas trader profesional.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-primary-500 hover:bg-primary-600 transition-all duration-300"
              >
                Mulai Gratis Sekarang
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-dark-700 border-2 border-dark-200 hover:border-dark-400 transition-all duration-300"
              >
                Sudah Punya Akun
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { value: "10K+", label: "Trader Aktif" },
                { value: "500+", label: "Video Tutorial" },
                { value: "98%", label: "Kepuasan User" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl md:text-3xl font-bold text-primary-500">
                    {stat.value}
                  </div>
                  <div className="text-dark-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Logo with red background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-80 h-80 bg-primary-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <img
                src="/astronacci-logo.svg"
                alt="Astronacci"
                className="w-48 h-48 object-contain animate-float"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-dark-800"
            >
              Semua yang Anda Butuhkan untuk Sukses Trading
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-dark-500 mt-4 max-w-2xl mx-auto"
            >
              Platform lengkap dengan fitur-fitur unggulan untuk membantu
              perjalanan trading Anda
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FiFileText,
                title: "Artikel Analisis",
                desc: "Analisis mendalam market saham, crypto, forex dengan metodologi Astronacci yang teruji.",
                color: "bg-orange-500",
              },
              {
                icon: FiPlay,
                title: "Video Tutorial",
                desc: "Pelajari strategi trading dari dasar hingga mahir dengan video HD berkualitas.",
                color: "bg-orange-500",
              },
              {
                icon: FiAward,
                title: "Sertifikasi",
                desc: "Dapatkan sertifikat setelah menyelesaikan modul pembelajaran trading.",
                color: "bg-orange-500",
              },
              {
                icon: FiTrendingUp,
                title: "Sinyal Trading",
                desc: "Akses sinyal trading real-time dari tim analis profesional kami.",
                color: "bg-orange-500",
              },
              {
                icon: FiShield,
                title: "Risk Management",
                desc: "Pelajari teknik manajemen risiko untuk melindungi modal Anda.",
                color: "bg-orange-500",
              },
              {
                icon: FiUsers,
                title: "Komunitas",
                desc: "Bergabung dengan ribuan trader lain untuk sharing dan diskusi.",
                color: "bg-orange-500",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-dark-100"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-dark-800 mb-4"
            >
              Pilih Tipe Membership
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-dark-500 max-w-2xl mx-auto"
            >
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {memberships.map((m, idx) => (
              <motion.div
                key={m.type}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className={`
                  relative bg-white rounded-2xl border-2 flex flex-col h-full
                  ${m.popular ? "border-primary-500 shadow-xl" : "border-dark-200 shadow-md"}
                  transition-all duration-300 hover:shadow-xl
                `}
              >
                {m.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-primary-500 text-white text-sm font-semibold shadow-lg">
                      Paling Populer
                    </span>
                  </div>
                )}

                <div className="p-8 flex-1">
                  <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-dark-100 text-dark-600 text-sm font-medium">
                      Tipe {m.type}
                    </span>
                    <h3 className="text-2xl font-bold text-dark-800 mt-4">
                      {m.name}
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-primary-500">
                      {m.price}
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {m.features.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className="text-dark-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0">
                  <Link
                    to="/register"
                    className={`
                      block w-full py-4 rounded-xl text-center font-semibold transition-all duration-300
                      ${
                        m.popular
                          ? "bg-primary-500 text-white hover:bg-primary-600"
                          : "bg-dark-100 text-dark-700 hover:bg-dark-200"
                      }
                    `}
                  >
                    Pilih {m.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
