import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

// Common emojis organized by category
const emojiCategories = {
  "😀": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
  "🥰": ["🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜"],
  "🤔": ["🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬"],
  "😢": ["😢", "😭", "😤", "😠", "😡", "🤬", "😱", "😨", "😰", "😥"],
  "🎉": ["🎉", "🎊", "🎈", "🎂", "🎁", "🎀", "🎃", "🎄", "🎆", "🎇"],
  "👍": ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉"],
  "❤️": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔"],
  "⭐": ["⭐", "🌟", "✨", "💫", "🌙", "☀️", "🌈", "☁️", "⛅", "🌤️"],
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("😀");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const pickerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative" ref={pickerRef}>
      <motion.button
        type="button"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          disabled
            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
            : isOpen
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        title="Add emoji"
      >
        <Smile className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={pickerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-14 left-0 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 rounded-2xl shadow-2xl p-4 z-50"
          >
            {/* Categories */}
            <div className="flex space-x-1 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-600/50">
              {Object.keys(emojiCategories).map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`p-2 rounded-lg text-lg transition-colors ${
                    activeCategory === category
                      ? "bg-primary-100 dark:bg-primary-900/30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Emoji Grid */}
            <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {emojiCategories[
                activeCategory as keyof typeof emojiCategories
              ].map((emoji, index) => (
                <motion.button
                  key={`${emoji}-${index}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEmojiClick(emoji)}
                  className="p-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Click an emoji to add it to your message
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
