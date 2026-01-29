// Halaman Home (Landing Page) - Modern 3D Effects
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
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

  // Floating animation for background orbs
  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Clean with 3D Card */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient Orbs */}
        <motion.div
          animate={floatAnimation}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-200 to-primary-100 rounded-full blur-3xl opacity-50"
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f920_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f920_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center">
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
              Kuasai Seni{" "}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Trading
              </span>{" "}
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
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5"
              >
                Mulai Gratis Sekarang
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-dark-700 border-2 border-dark-200 hover:border-primary-300 hover:text-primary-600 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sudah Punya Akun
              </Link>
            </motion.div>

            {/* Stats with CountUp */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { value: 10, suffix: "K+", label: "Trader Aktif" },
                { value: 500, suffix: "+", label: "Video Tutorial" },
                { value: 98, suffix: "%", label: "Kepuasan User" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    <CountUp
                      end={stat.value}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-dark-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Glass Trading Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glareBorderRadius="24px"
              scale={1.02}
              transitionSpeed={1500}
            >
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 overflow-hidden">
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                      <FiTrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-800">
                        Trading Dashboard
                      </h3>
                      <p className="text-dark-400 text-sm">Market Insight</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-green-600">
                      Live
                    </span>
                  </div>
                </div>

                {/* Market Tickers */}
                <div className="space-y-3">
                  {[
                    {
                      name: "IHSG",
                      change: "+2.34",
                      positive: true,
                      value: "7,245",
                    },
                    {
                      name: "Bitcoin",
                      change: "-1.45",
                      positive: false,
                      value: "$43,521",
                    },
                    {
                      name: "USD/IDR",
                      change: "+0.12",
                      positive: true,
                      value: "15,432",
                    },
                  ].map((ticker, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md ${
                        ticker.positive
                          ? "bg-green-50/80 border-green-100 hover:border-green-200"
                          : "bg-red-50/80 border-red-100 hover:border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            ticker.positive ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <FiTrendingUp
                            className={`w-5 h-5 ${
                              ticker.positive
                                ? "text-green-600"
                                : "text-red-600 rotate-180"
                            }`}
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-dark-800">
                            {ticker.name}
                          </span>
                          <p className="text-xs text-dark-400">
                            {ticker.value}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-lg ${
                          ticker.positive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {ticker.change}%
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-dark-100 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-dark-50 rounded-xl">
                    <p className="text-2xl font-bold text-dark-800">24</p>
                    <p className="text-xs text-dark-400">Sinyal Hari Ini</p>
                  </div>
                  <div className="text-center p-3 bg-dark-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">87%</p>
                    <p className="text-xs text-dark-400">Win Rate</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Interactive Cards */}
      <section className="py-24 bg-dark-50 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4">
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
              Semua yang Anda Butuhkan untuk{" "}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Sukses Trading
              </span>
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
              },
              {
                icon: FiPlay,
                title: "Video Tutorial",
                desc: "Pelajari strategi trading dari dasar hingga mahir dengan video HD berkualitas.",
              },
              {
                icon: FiAward,
                title: "Sertifikasi",
                desc: "Dapatkan sertifikat setelah menyelesaikan modul pembelajaran trading.",
              },
              {
                icon: FiTrendingUp,
                title: "Sinyal Trading",
                desc: "Akses sinyal trading real-time dari tim analis profesional kami.",
              },
              {
                icon: FiShield,
                title: "Risk Management",
                desc: "Pelajari teknik manajemen risiko untuk melindungi modal Anda.",
              },
              {
                icon: FiUsers,
                title: "Komunitas",
                desc: "Bergabung dengan ribuan trader lain untuk sharing dan diskusi.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-dark-100 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-dark-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers - 3D Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary-100 to-secondary-100 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4">
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
              Pilih Tipe{" "}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Membership
              </span>
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
            {memberships.map((m) => (
              <motion.div
                key={m.type}
                variants={scaleIn}
                whileHover={{
                  y: -12,
                  boxShadow: m.popular
                    ? "0 30px 60px -15px rgba(229, 57, 53, 0.3)"
                    : "0 30px 60px -15px rgba(0, 0, 0, 0.2)",
                }}
                className={`
                  relative bg-white rounded-3xl border-2 flex flex-col h-full
                  ${m.popular ? "border-primary-500" : "border-dark-200"}
                  transition-all duration-500 shadow-lg
                `}
              >
                {/* Shine effect for popular */}
                {m.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none" />
                )}

                {m.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold shadow-lg">
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
                    <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
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
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl"
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
