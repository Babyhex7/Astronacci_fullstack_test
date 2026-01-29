// Halaman List Artikel
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../services/articleService";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import { FiSearch } from "react-icons/fi";

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

  if (loading) {
    return <Loader.FullPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Artikel Analisis</h1>
        <p className="text-gray-600 mt-1">
          Baca analisis market, saham, crypto, dan forex
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada artikel ditemukan</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
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
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(article.created_at).toLocaleDateString("id-ID")}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
