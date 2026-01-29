// Halaman Home (Landing Page)
import { Link } from "react-router-dom";
import { FiCheckCircle, FiPlay, FiFileText, FiAward } from "react-icons/fi";

const Home = () => {
  // Data tipe membership
  const memberships = [
    {
      type: "A",
      name: "Free",
      articles: 3,
      videos: 3,
      color: "border-gray-300",
      badge: "bg-gray-100 text-gray-800",
    },
    {
      type: "B",
      name: "Basic",
      articles: 10,
      videos: 10,
      color: "border-primary-500",
      badge: "bg-primary-100 text-primary-800",
      popular: true,
    },
    {
      type: "C",
      name: "Premium",
      articles: "Unlimited",
      videos: "Unlimited",
      color: "border-yellow-500",
      badge: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🚀 Astronacci Trading Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Edukasi trading dan research saham terbaik untuk kesuksesan
            investasi Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Mulai Gratis
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sudah Punya Akun
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fitur Unggulan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <FiFileText className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Artikel Analisis</h3>
              <p className="text-gray-600">
                Analisis mendalam market, saham, crypto, dan forex
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <FiPlay className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Tutorial</h3>
              <p className="text-gray-600">
                Tutorial trading dari dasar hingga mahir
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <FiAward className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3 Tipe Membership</h3>
              <p className="text-gray-600">
                Pilih sesuai kebutuhan dan budget Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pilih Tipe Membership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {memberships.map((m) => (
              <div
                key={m.type}
                className={`
                  relative bg-white rounded-xl shadow-md border-2 p-6
                  ${m.color}
                  ${m.popular ? "transform scale-105" : ""}
                `}
              >
                {m.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm">
                    Popular
                  </span>
                )}
                <div className="text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${m.badge}`}
                  >
                    Tipe {m.type}
                  </span>
                  <h3 className="text-2xl font-bold mt-4">{m.name}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>{m.articles} Artikel Analisis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>{m.videos} Video Tutorial</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>Akses Dashboard</span>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className={`
                    block w-full mt-6 py-3 rounded-lg text-center font-semibold transition-colors
                    ${
                      m.popular
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  `}
                >
                  Pilih {m.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Mulai Trading?
          </h2>
          <p className="text-primary-100 mb-8">
            Daftar sekarang dan dapatkan akses ke konten edukasi trading terbaik
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Daftar Gratis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
