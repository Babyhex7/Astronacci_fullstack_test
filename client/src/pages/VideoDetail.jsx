import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { getVideoById } from "../services/videoService";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { FiArrowLeft, FiClock, FiLock } from "react-icons/fi";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const data = await getVideoById(id);
      setVideo(data.video);
    } catch (err) {
      if (err.response?.status === 403) {
        setAccessDenied(true);
        setError(err.response?.data?.message);
      } else {
        setError("Video tidak ditemukan");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader.FullPage />;
  }

  if (accessDenied) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-dark-200 rounded-xl p-8 text-center">
          <FiLock className="w-16 h-16 mx-auto text-dark-400 mb-4" />
          <h2 className="text-2xl font-bold text-dark-800 mb-2">
            Batas Akses Tercapai
          </h2>
          <p className="text-dark-600 mb-6">{error}</p>
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        to="/videos"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft />
        <span>Kembali ke Video</span>
      </Link>

      {/* Video Player */}
      <div className="bg-black rounded-xl overflow-hidden mb-6">
        <div className="aspect-video">
          <ReactPlayer
            url={video?.video_url}
            width="100%"
            height="100%"
            controls
            playing={false}
            config={{
              youtube: {
                playerVars: { modestbranding: 1 },
              },
            }}
          />
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {video?.category && (
            <Badge variant={video.category.toLowerCase()}>
              {video.category}
            </Badge>
          )}
          {video?.duration && (
            <div className="flex items-center text-gray-500 text-sm">
              <FiClock className="mr-1" />
              {video.duration} menit
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {video?.title}
        </h1>

        {/* Description */}
        <div className="text-gray-700 whitespace-pre-wrap">
          {video?.description}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
