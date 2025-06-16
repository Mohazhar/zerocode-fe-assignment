import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  ChatMessage as ChatMessageType,
  sendMessageToBot,
  generateMessageId,
} from "../utils/chatApi";
import { exportChatAsText, exportChatAsJSON } from "../utils/exportChat";
import { EnhancedChatMessage } from "../components/chat/EnhancedChatMessage";
import { EnhancedChatInput } from "../components/chat/EnhancedChatInput";
import { EnhancedLoading } from "../components/ui/EnhancedLoading";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { FloatingActionButton } from "../components/ui/FloatingActionButton";
import { GlassCard } from "../components/ui/GlassCard";
import { TypingAnimation } from "../components/ui/TypingAnimation";
import { Button } from "../components/ui/button";
import {
  MessageCircle,
  LogOut,
  Download,
  Trash2,
  Settings,
  MoreVertical,
  FileText,
  FileJson,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Chat() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: generateMessageId(),
      content:
        "Hello! I'm ChatBot AI, your intelligent assistant. I'm here to help you with anything you need. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessageId, setNewMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: generateMessageId(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get bot response
      const botResponse = await sendMessageToBot(content);

      const botMessageId = generateMessageId();
      const botMessage: ChatMessageType = {
        id: botMessageId,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setNewMessageId(botMessageId);
      setMessages((prev) => [...prev, botMessage]);

      // Clear the new message flag after a delay
      setTimeout(() => setNewMessageId(null), 3000);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessageType = {
        id: generateMessageId(),
        content:
          "Sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportText = () => {
    exportChatAsText(messages);
  };

  const handleExportJSON = () => {
    exportChatAsJSON(messages);
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([
        {
          id: generateMessageId(),
          content:
            "Chat cleared! I'm ready to help you with anything new. What would you like to talk about?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        const { error } = await signOut();

        // Always navigate to login, even if there was an error
        navigate("/login", { replace: true });

        if (
          error &&
          error.message !== "Signed out locally due to session error"
        ) {
          console.warn("Signout completed with warning:", error.message);
        }
      } catch (err) {
        // Fallback: navigate to login even if signout completely fails
        console.error("Signout error:", err);
        navigate("/login", { replace: true });
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-primary-200/30 dark:text-primary-800/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header variants={headerVariants} className="relative z-10">
        <GlassCard variant="subtle" className="m-4 p-4 border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                  <TypingAnimation text="ChatBot AI" speed={100} />
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Welcome back, {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Stats */}
              <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">
                    {messages.length - 1} messages
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">AI Ready</span>
                </div>
              </div>

              <ThemeToggle />

              {/* More options dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
                >
                  <DropdownMenuItem
                    onClick={handleExportText}
                    className="font-medium hover:bg-white/50 dark:hover:bg-gray-700/50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export as Text
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleExportJSON}
                    className="font-medium hover:bg-white/50 dark:hover:bg-gray-700/50"
                  >
                    <FileJson className="mr-2 h-4 w-4" />
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleClearChat}
                    className="text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Chat
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </GlassCard>
      </motion.header>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300/50 dark:scrollbar-thumb-gray-600/50 scrollbar-track-transparent"
      >
        <div className="max-w-4xl mx-auto space-y-1">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <EnhancedChatMessage
                key={message.id}
                message={message}
                isNew={newMessageId === message.id}
              />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <EnhancedLoading
                key="loading"
                variant="thinking"
                message="Thinking carefully..."
              />
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="relative z-10">
        <EnhancedChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder={
            isLoading ? "Please wait while I think..." : "Type your message..."
          }
        />
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon={Download}
        onClick={handleExportText}
        label="Quick Export"
        position="bottom-left"
        variant="secondary"
      />

      <FloatingActionButton
        icon={Settings}
        onClick={() => console.log("Settings")}
        label="Settings"
        position="top-right"
        variant="secondary"
        size="sm"
      />

      {/* Status bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 text-center border-t border-white/20 dark:border-gray-700/50"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {messages.length - 1} messages • Voice input available • Press ↑ for
          history
        </p>
      </motion.div>
    </motion.div>
  );
}
