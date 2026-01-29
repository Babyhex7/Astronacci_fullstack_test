const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-dark-100 text-dark-600",
    primary: "bg-primary-100 text-primary-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-accent-100 text-accent-700",
    "primary-solid": "bg-primary-600 text-white",
    "warning-solid": "bg-amber-500 text-white",
    "default-solid": "bg-dark-600 text-white",
    saham: "bg-primary-100 text-primary-700",
    crypto: "bg-accent-100 text-accent-700",
    forex: "bg-green-100 text-green-700",
    teknikal: "bg-primary-200 text-primary-800",
    fundamental: "bg-teal-100 text-teal-700",
  };

  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-full text-xs font-semibold
        ${variants[variant.toLowerCase()] || variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
