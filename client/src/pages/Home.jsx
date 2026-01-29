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
      color: "border-dark-300",
      bg: "bg-white",
      badge: "bg-dark-100 text-dark-600",
    },
    {
      type: "B",
      name: "Basic",
      price: "Rp 99K/bln",
      articles: 10,
      videos: 10,
      color: "border-primary-500",
      bg: "bg-gradient-to-br from-primary-50 to-white",
      badge: "bg-primary-500 text-white",
      popular: true,
    },
    {
      type: "C",
      name: "Premium",
      price: "Rp 199K/bln",
      articles: "Unlimited",
      videos: "Unlimited",
      color: "border-accent-500",
      bg: "bg-gradient-to-br from-accent-50 to-white",
      badge: "bg-accent-500 text-white",
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium border border-primary-500/30">
                <FiTrendingUp className="mr-2" />
                Platform Trading & Research Terpercaya
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Kuasai Seni{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500">
                Trading
              </span>{" "}
              dengan Astronacci
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-dark-300 mb-8 max-w-xl"
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
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
              >
                Mulai Gratis Sekarang
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white border-2 border-dark-500 hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
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
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-dark-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur-2xl opacity-30 animate-pulse-slow" />
              <img
                src="/astronacci-logo.svg"
                alt="Astronacci"
                className="relative w-80 h-80 object-contain animate-float"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-dark-500 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary-500 rounded-full"
            />
          </div>
        </motion.div>
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
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-600 text-sm font-medium mb-4"
            >
              Fitur Unggulan
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-dark-800"
            >
              Semua yang Anda Butuhkan untuk Sukses Trading
            </motion.h2>
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
                gradient: "from-primary-500 to-primary-600",
              },
              {
                icon: FiPlay,
                title: "Video Tutorial",
                desc: "Pelajari strategi trading dari dasar hingga mahir dengan video HD berkualitas.",
                gradient: "from-accent-500 to-accent-600",
              },
              {
                icon: FiAward,
                title: "Sertifikasi",
                desc: "Dapatkan sertifikat setelah menyelesaikan modul pembelajaran trading.",
                gradient: "from-primary-400 to-accent-500",
              },
              {
                icon: FiTrendingUp,
                title: "Sinyal Trading",
                desc: "Akses sinyal trading real-time dari tim analis profesional kami.",
                gradient: "from-accent-400 to-primary-500",
              },
              {
                icon: FiShield,
                title: "Risk Management",
                desc: "Pelajari teknik manajemen risiko untuk melindungi modal Anda.",
                gradient: "from-primary-600 to-accent-500",
              },
              {
                icon: FiUsers,
                title: "Komunitas",
                desc: "Bergabung dengan ribuan trader lain untuk sharing dan diskusi.",
                gradient: "from-accent-500 to-primary-400",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-dark-100"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
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
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-600 text-sm font-medium mb-4"
            >
              Pilih Paket
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-dark-800 mb-4"
            >
              Tipe Membership
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-dark-500 max-w-2xl mx-auto"
            >
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Upgrade
              kapan saja.
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
                  relative rounded-2xl border-2 p-8 ${m.bg} ${m.color}
                  ${m.popular ? "lg:-mt-4 lg:mb-4 shadow-xl" : "shadow-md"}
                  transition-all duration-300 hover:shadow-xl
                `}
              >
                {m.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg">
                      Paling Populer
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${m.badge}`}
                  >
                    Tipe {m.type}
                  </span>
                  <h3 className="text-2xl font-bold text-dark-800 mt-4">
                    {m.name}
                  </h3>
                  <div className="mt-2 text-3xl font-bold text-dark-900">
                    {m.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    `${m.articles} Artikel Analisis`,
                    `${m.videos} Video Tutorial`,
                    "Akses Dashboard",
                    m.type !== "A" && "Sinyal Trading",
                    m.type === "C" && "Konsultasi 1-on-1",
                  ]
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className="text-dark-600">{item}</span>
                      </li>
                    ))}
                </ul>

                <Link
                  to="/register"
                  className={`
                    block w-full py-4 rounded-xl text-center font-semibold transition-all duration-300
                    ${
                      m.popular
                        ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/30"
                        : "bg-dark-100 text-dark-700 hover:bg-dark-200"
                    }
                  `}
                >
                  Pilih {m.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          <motion.img
            variants={scaleIn}
            src="/astronacci-logo.svg"
            alt="Astronacci"
            className="w-20 h-20 mx-auto mb-8 opacity-80"
          />
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Siap Memulai Perjalanan Trading Anda?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-dark-300 mb-10 max-w-2xl mx-auto"
          >
            Bergabung sekarang dan akses ratusan konten edukasi trading
            berkualitas dari para profesional.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
            >
              Daftar Gratis Sekarang
              <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
