import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Bot, MessageCircle } from "lucide-react";

interface EnhancedLoadingProps {
  variant?: "typing" | "thinking" | "processing";
  message?: string;
}

export const EnhancedLoading = forwardRef<HTMLDivElement, EnhancedLoadingProps>(
  ({ variant = "typing", message = "AI is thinking..." }, ref) => {
    const containerVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    const dotVariants = {
      initial: { y: 0 },
      animate: {
        y: [-3, 0, -3],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    const pulseVariants = {
      initial: { scale: 1, opacity: 0.7 },
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    const renderTypingIndicator = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            className="w-2 h-2 bg-primary-500 rounded-full"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    );

    const renderThinkingIndicator = () => (
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center"
      >
        <Bot className="w-4 h-4 text-white" />
      </motion.div>
    );

    const renderProcessingIndicator = () => (
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
        />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              className="w-1 h-4 bg-gradient-to-t from-primary-500 to-purple-600 rounded-full"
            />
          ))}
        </div>
      </div>
    );

    const getIndicator = () => {
      switch (variant) {
        case "thinking":
          return renderThinkingIndicator();
        case "processing":
          return renderProcessingIndicator();
        default:
          return renderTypingIndicator();
      }
    };

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="initial"
        layout
        className="flex justify-start mb-4"
      >
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </motion.div>

          {/* Loading indicator */}
          <div className="bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              {getIndicator()}
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {message}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

EnhancedLoading.displayName = "EnhancedLoading";
