import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "intense" | "subtle";
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "default",
  animated = true,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "intense":
        return "bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border-white/30 dark:border-gray-700/50";
      case "subtle":
        return "bg-white/5 dark:bg-gray-800/10 backdrop-blur-sm border-white/10 dark:border-gray-700/20";
      default:
        return "bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border-white/20 dark:border-gray-700/30";
    }
  };

  return (
    <div
      className={`
        ${getVariantClass()}
        rounded-2xl border shadow-xl
        ${animated ? "transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-gray-800/25" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
