// Halaman List Artikel
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getArticles } from "../services/articleService";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import { FiSearch, FiFileText } from "react-icons/fi";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch artikel saat mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter artikel
  const filteredArticles = articles.filter((article) => {
    const matchSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter =
      filter === "all" || article.category?.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  // Get unique categories
  const categories = [
    ...new Set(articles.map((a) => a.category).filter(Boolean)),
  ];

  // Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <Loader.FullPage />;
  }

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <FiFileText className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Artikel Analisis</h1>
              <p className="text-primary-100 mt-1">
                Baca analisis market, saham, crypto, dan forex
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <FiFileText className="w-16 h-16 mx-auto text-dark-300 mb-4" />
            <p className="text-dark-500">Tidak ada artikel ditemukan</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link to={`/articles/${article.id}`}>
                  <Card hover className="h-full">
                    <Card.Image src={article.thumbnail_url} alt={article.title} />
                    <Card.Body>
                      {article.category && (
                        <Badge variant={article.category.toLowerCase()}>
                          {article.category}
                        </Badge>
                      )}
                      <Card.Title className="mt-2 line-clamp-2">
                        {article.title}
                      </Card.Title>
                      <Card.Text className="line-clamp-2">
                        {article.content?.substring(0, 100)}...
                      </Card.Text>
                      <p className="text-xs text-dark-400 mt-3">
                        {new Date(article.created_at).toLocaleDateString("id-ID")}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;
