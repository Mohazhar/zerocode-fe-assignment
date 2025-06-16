import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { VoiceInput } from "./VoiceInput";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
}) => {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);

      // Add to history
      setMessageHistory((prev) => [trimmedMessage, ...prev].slice(0, 50)); // Keep last 50 messages
      setHistoryIndex(-1);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "ArrowUp" && messageHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, messageHistory.length - 1);
      setHistoryIndex(newIndex);
      setMessage(messageHistory[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setMessage(messageHistory[newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setMessage("");
      }
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setMessage((prev) => prev + (prev ? " " : "") + transcript);
    setHistoryIndex(-1);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment button (placeholder) */}
        <button
          type="button"
          disabled
          className="p-2 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
          title="File attachments (coming soon)"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setHistoryIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ maxHeight: "120px" }}
          />

          {/* Voice input button */}
          <div className="absolute right-3 bottom-3">
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="p-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          title="Send message (Enter)"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Message history hint */}
      {messageHistory.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Use ↑↓ arrow keys to navigate message history
        </div>
      )}
    </div>
  );
};
