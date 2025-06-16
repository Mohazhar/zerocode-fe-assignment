import React from "react";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: "gradient" | "mesh" | "particles";
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = "gradient",
  className = "",
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case "mesh":
        return "bg-mesh-gradient animate-gradient bg-[length:400%_400%]";
      case "particles":
        return "bg-gradient-to-br from-primary-900 via-purple-900 to-pink-900";
      default:
        return "bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";
    }
  };

  return (
    <div
      className={`relative min-h-screen ${getBackgroundClass()} ${className}`}
    >
      {/* Animated particles for particles variant */}
      {variant === "particles" && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Mesh overlay for additional visual interest */}
      {variant === "mesh" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent dark:via-white/2" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
