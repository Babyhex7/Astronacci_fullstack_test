// Komponen Loader/Spinner
const Loader = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          border-4 border-primary-200 border-t-primary-500
          rounded-full animate-spin
        `}
      />
    </div>
  );
};

// Loader full page
Loader.FullPage = () => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <img
      src="/astronacci-logo.svg"
      alt="Loading"
      className="w-16 h-16 mb-4 animate-pulse"
    />
    <Loader size="lg" />
  </div>
);

export default Loader;
