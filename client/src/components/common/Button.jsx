// Komponen Button reusable
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  // Variasi warna (warna brand Astronacci)
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/30 text-white",
    secondary: "bg-dark-100 hover:bg-dark-200 text-dark-700",
    danger: "bg-accent-600 hover:bg-accent-700 text-white",
    outline:
      "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-dark-600 hover:bg-dark-100",
  };

  // Variasi ukuran
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        rounded-xl font-semibold transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
