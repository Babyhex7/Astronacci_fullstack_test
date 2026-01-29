// Halaman List Video
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getVideos } from "../services/videoService";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import { FiSearch, FiClock, FiPlay } from "react-icons/fi";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch video saat mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter video
  const filteredVideos = videos.filter((video) => {
    const matchSearch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter =
      filter === "all" || video.category?.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  // Get unique categories
  const categories = [
    ...new Set(videos.map((v) => v.category).filter(Boolean)),
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
      <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <FiPlay className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Video Tutorial</h1>
              <p className="text-accent-100 mt-1">
                Pelajari teknik trading dari video tutorial lengkap
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
              placeholder="Cari video..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16">
            <FiPlay className="w-16 h-16 mx-auto text-dark-300 mb-4" />
            <p className="text-dark-500">Tidak ada video ditemukan</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <Link to={`/videos/${video.id}`}>
                  <Card hover className="h-full">
                    <div className="relative">
                      <Card.Image src={video.thumbnail_url} alt={video.title} />
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-0 h-0 border-l-[20px] border-l-accent-500 border-y-[12px] border-y-transparent ml-1" />
                        </div>
                      </div>
                      {/* Duration */}
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg flex items-center">
                          <FiClock className="mr-1" />
                          {video.duration} menit
                        </div>
                      )}
                    </div>
                    <Card.Body>
                      {video.category && (
                        <Badge variant={video.category.toLowerCase()}>
                          {video.category}
                        </Badge>
                      )}
                      <Card.Title className="mt-2 line-clamp-2">
                        {video.title}
                      </Card.Title>
                      <Card.Text className="line-clamp-2">
                        {video.description}
                      </Card.Text>
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

export default Videos;
