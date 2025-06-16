import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChatMessage as ChatMessageType } from "../../utils/chatApi";
import { Bot, User, Copy, Check } from "lucide-react";
import { TypingAnimation } from "../ui/TypingAnimation";

interface EnhancedChatMessageProps {
  message: ChatMessageType;
  isNew?: boolean;
}

export const EnhancedChatMessage: React.FC<EnhancedChatMessageProps> = ({
  message,
  isNew = false,
}) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === "bot";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const messageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const avatarVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.1,
        type: "spring",
        stiffness: 200,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-6 group`}
    >
      <div
        className={`flex max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"} items-end`}
      >
        {/* Avatar */}
        <motion.div
          variants={avatarVariants}
          className={`flex-shrink-0 ${isBot ? "mr-3" : "ml-3"}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 ${
              isBot
                ? "bg-gradient-to-br from-primary-500 to-purple-600"
                : "bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700"
            }`}
          >
            {isBot ? (
              <Bot className="w-5 h-5 text-white" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
        </motion.div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
          <motion.div
            className={`relative px-5 py-4 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 group-hover:shadow-xl ${
              isBot
                ? "bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 rounded-bl-md"
                : "bg-gradient-to-br from-primary-600 to-purple-600 text-white border-primary-500/30 rounded-br-md"
            }`}
          >
            {/* Copy button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className={`absolute top-2 ${isBot ? "right-2" : "left-2"} p-1.5 rounded-lg bg-black/10 hover:bg-black/20 transition-all duration-200 opacity-0 group-hover:opacity-100`}
              onClick={copyToClipboard}
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </motion.button>

            {/* Message text */}
            <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap pr-6">
              {isNew && isBot ? (
                <TypingAnimation
                  text={message.content}
                  speed={30}
                  className="text-inherit"
                />
              ) : (
                message.content
              )}
            </div>

            {/* Message tail */}
            <div
              className={`absolute bottom-0 w-3 h-3 ${
                isBot
                  ? "-left-1 bg-white/80 dark:bg-gray-800/80 border-l border-b border-gray-200/50 dark:border-gray-600/50"
                  : "-right-1 bg-gradient-to-br from-primary-600 to-purple-600 border-r border-b border-primary-500/30"
              } transform rotate-45`}
            />
          </motion.div>

          {/* Timestamp */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-2 font-mono"
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
