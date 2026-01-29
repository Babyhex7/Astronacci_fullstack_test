// Komponen Card reusable
const Card = ({ children, className = "", onClick, hover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-sm border border-dark-100 overflow-hidden
        ${hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" : ""}
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
  <div className={`p-5 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold text-dark-800 ${className}`}>
    {children}
  </h3>
);

Card.Text = ({ children, className = "" }) => (
  <p className={`text-dark-500 text-sm mt-2 leading-relaxed ${className}`}>{children}</p>
);

export default Card;
