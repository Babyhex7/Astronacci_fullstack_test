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
      <div className="relative bg-white border-b border-dark-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-50 text-secondary-600 rounded-lg text-sm font-medium mb-3">
                <span>Video Learning</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-dark-800 mb-3">
                Video Tutorial Trading
              </h1>
              <p className="text-lg text-dark-500 mb-6 max-w-3xl">
                Pelajari strategi dan teknik trading dari para profesional melalui video tutorial HD berkualitas tinggi.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-3xl font-bold text-secondary-500">{videos.length}</div>
                  <div className="text-sm text-dark-400">Total Video</div>
                </div>
                <div className="border-l border-dark-200 pl-6">
                  <div className="text-3xl font-bold text-dark-800">HD</div>
                  <div className="text-sm text-dark-400">High Quality</div>
                </div>
                <div className="border-l border-dark-200 pl-6">
                  <div className="text-3xl font-bold text-dark-800">Pro</div>
                  <div className="text-sm text-dark-400">Expert Trainer</div>
                </div>
              </div>
            </div>

            {/* 3D Icon */}
            <div className="relative group hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center shadow-xl shadow-secondary-500/30 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <FiPlay className="w-16 h-16 text-white" />
              </div>
              {/* 3D effect layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-300 to-secondary-500 rounded-2xl -z-10 translate-x-1.5 translate-y-1.5 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-200 to-secondary-400 rounded-2xl -z-20 translate-x-3 translate-y-3 opacity-40" />
            </div>
          </div>
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
              className="w-full pl-12 pr-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-dark-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
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
                          <div className="w-0 h-0 border-l-[20px] border-l-secondary-500 border-y-[12px] border-y-transparent ml-1" />
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
