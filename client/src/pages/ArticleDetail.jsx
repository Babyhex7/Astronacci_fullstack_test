// Halaman Detail Artikel
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getArticleById } from "../services/articleService";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { FiArrowLeft, FiCalendar, FiLock } from "react-icons/fi";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  // Fetch artikel saat mount
  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id);
      setArticle(data.article);
    } catch (err) {
      if (err.response?.status === 403) {
        setAccessDenied(true);
        setError(err.response?.data?.message);
      } else {
        setError("Artikel tidak ditemukan");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader.FullPage />;
  }

  // Access denied view
  if (accessDenied) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <FiLock className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Batas Akses Tercapai
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate(-1)} variant="secondary">
              Kembali
            </Button>
            <Link to="/profile">
              <Button>Lihat Membership</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error view
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">{error}</p>
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        to="/articles"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft />
        <span>Kembali ke Artikel</span>
      </Link>

      {/* Article */}
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Thumbnail */}
        {article?.thumbnail_url && (
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article?.category && (
              <Badge variant={article.category.toLowerCase()}>
                {article.category}
              </Badge>
            )}
            <div className="flex items-center text-gray-500 text-sm">
              <FiCalendar className="mr-1" />
              {new Date(article?.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {article?.title}
          </h1>

          {/* Body */}
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
            {article?.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
