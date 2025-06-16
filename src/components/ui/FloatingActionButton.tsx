import React from "react";
import { LucideIcon } from "lucide-react";

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  position = "bottom-right",
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const getPositionClass = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600";
      case "danger":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-primary-600 hover:bg-primary-700";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-12 h-12";
      case "lg":
        return "w-16 h-16";
      default:
        return "w-14 h-14";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        fixed ${getPositionClass()} ${getSizeClass()} ${getVariantClass()}
        text-white rounded-full shadow-xl hover:shadow-2xl
        transition-all duration-300 ease-out
        transform hover:scale-110 active:scale-95
        backdrop-blur-sm border border-white/10
        group animate-float
        ${className}
      `}
      title={label}
      aria-label={label}
    >
      <Icon
        className={`
          transition-transform duration-200 group-hover:scale-110
          ${size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6"}
        `}
      />
    </button>
  );
};
