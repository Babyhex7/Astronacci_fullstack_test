// Halaman List Video
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getVideos } from "../services/videoService";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import { FiSearch, FiClock } from "react-icons/fi";

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

  if (loading) {
    return <Loader.FullPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Video Tutorial</h1>
        <p className="text-gray-600 mt-1">
          Pelajari teknik trading dari video tutorial lengkap
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
            placeholder="Cari video..."
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

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada video ditemukan</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Link key={video.id} to={`/videos/${video.id}`}>
              <Card hover className="h-full">
                <div className="relative">
                  <Card.Image src={video.thumbnail_url} alt={video.title} />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-primary-600 border-y-[12px] border-y-transparent ml-1" />
                    </div>
                  </div>
                  {/* Duration */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
