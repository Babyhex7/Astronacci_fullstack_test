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

Loader.FullPage = () => (
  <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
    <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4 animate-pulse">
      Astronacci
    </div>
    <Loader size="lg" />
  </div>
);

export default Loader;
