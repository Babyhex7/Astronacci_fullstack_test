// Komponen Card reusable
const Card = ({ children, className = "", onClick, hover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md overflow-hidden
        ${hover ? "hover:shadow-lg transition-shadow cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Sub-komponen untuk Card
Card.Image = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-48 object-cover ${className}`}
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
    }}
  />
);

Card.Body = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

Card.Text = ({ children, className = "" }) => (
  <p className={`text-gray-600 text-sm mt-2 ${className}`}>{children}</p>
);

export default Card;
