import React from "react";
import { ChatMessage as ChatMessageType } from "../../utils/chatApi";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <div
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`flex max-w-[80%] ${isBot ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isBot ? "mr-3" : "ml-3"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isBot
                ? "bg-primary-100 dark:bg-primary-900"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            {isBot ? (
              <Bot className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            ) : (
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isBot
                ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                : "bg-primary-600 text-white"
            } ${isBot ? "rounded-bl-md" : "rounded-br-md"}`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
