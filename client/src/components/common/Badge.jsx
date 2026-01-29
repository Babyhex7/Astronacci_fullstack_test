// Komponen Badge untuk kategori/label
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    // Untuk kategori konten
    saham: "bg-blue-100 text-blue-800",
    crypto: "bg-purple-100 text-purple-800",
    forex: "bg-green-100 text-green-800",
    teknikal: "bg-orange-100 text-orange-800",
    fundamental: "bg-teal-100 text-teal-800",
  };

  return (
    <span
      className={`
        inline-block px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant.toLowerCase()] || variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
