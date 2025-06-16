import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap } from "lucide-react";
import { VoiceInput } from "./VoiceInput";
import { EmojiPicker } from "../ui/EmojiPicker";
import { FileUpload } from "../ui/FileUpload";
import { GlassCard } from "../ui/GlassCard";

interface EnhancedChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const EnhancedChatInput: React.FC<EnhancedChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
}) => {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
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

    if ((trimmedMessage || attachedFiles.length > 0) && !disabled) {
      onSendMessage(trimmedMessage || "📎 Shared files", attachedFiles);

      // Add to history (only text messages)
      if (trimmedMessage) {
        setMessageHistory((prev) => [trimmedMessage, ...prev].slice(0, 50));
      }

      setHistoryIndex(-1);
      setMessage("");
      setAttachedFiles([]);
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

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setHistoryIndex(-1);
    // Focus back to textarea
    textareaRef.current?.focus();
  };

  const handleFileSelect = (files: File[]) => {
    setAttachedFiles(files);
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    unfocused: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-t border-white/10 dark:border-gray-700/50 backdrop-blur-xl bg-white/50 dark:bg-gray-800/50"
    >
      <div className="p-4 max-w-4xl mx-auto">
        <GlassCard variant="subtle" className="p-1">
          <motion.form
            onSubmit={handleSubmit}
            className="flex items-end space-x-3 p-3"
            variants={inputVariants}
            animate={isFocused ? "focused" : "unfocused"}
          >
            {/* Quick Actions */}
            <div className="flex space-x-1">
              <FileUpload
                onFileSelect={handleFileSelect}
                disabled={disabled}
                maxFiles={3}
                maxSizeInMB={5}
              />

              <EmojiPicker
                onEmojiSelect={handleEmojiSelect}
                disabled={disabled}
              />
            </div>

            {/* Message input */}
            <div className="flex-1 relative">
              <motion.textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setHistoryIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="w-full px-4 py-3 pr-14 text-sm border border-transparent rounded-xl bg-gray-100/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transition-all duration-200 font-medium"
                style={{ maxHeight: "120px" }}
              />

              {/* Voice input button */}
              <div className="absolute right-3 bottom-3">
                <VoiceInput
                  onTranscript={handleVoiceTranscript}
                  disabled={disabled}
                />
              </div>

              {/* AI suggestion indicator */}
              <AnimatePresence>
                {message.length > 10 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-1 right-12 flex items-center space-x-1 text-xs text-primary-500 dark:text-primary-400"
                  >
                    <Zap className="w-3 h-3" />
                    <span className="font-medium">AI Ready</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Send button */}
            <motion.button
              type="submit"
              disabled={
                disabled || (!message.trim() && attachedFiles.length === 0)
              }
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              title={`Send ${message.trim() ? "message" : attachedFiles.length > 0 ? "files" : "message"} (Enter)`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </GlassCard>

        {/* Message history hint */}
        <AnimatePresence>
          {((messageHistory.length > 0 && isFocused) ||
            attachedFiles.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center font-medium"
            >
              {attachedFiles.length > 0 && (
                <span className="text-primary-600 dark:text-primary-400">
                  {attachedFiles.length} file
                  {attachedFiles.length > 1 ? "s" : ""} attached
                  {messageHistory.length > 0 && isFocused && " • "}
                </span>
              )}
              {messageHistory.length > 0 && isFocused && (
                <span>
                  Use ↑↓ arrow keys to navigate message history •{" "}
                  {messageHistory.length} messages saved
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
