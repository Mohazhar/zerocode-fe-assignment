import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 50,
  className = "",
  onComplete,
  cursor = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span
          className={`inline-block w-0.5 h-5 bg-current ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
        >
          |
        </span>
      )}
    </span>
  );
};
