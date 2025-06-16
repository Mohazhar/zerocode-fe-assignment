export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Simulate bot responses with realistic delay
export const sendMessageToBot = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000),
  );

  // Simple bot responses based on keywords
  const responses = {
    hello: "Hello! I'm your AI assistant. How can I help you today?",
    help: "I'm here to assist you with any questions or tasks you might have. Feel free to ask me anything!",
    weather:
      "I'd love to help with weather information, but I don't have access to real-time weather data. You might want to check a weather service for current conditions.",
    time: `The current time is ${new Date().toLocaleTimeString()}.`,
    date: `Today's date is ${new Date().toLocaleDateString()}.`,
    name: "I'm ChatBot AI, your friendly virtual assistant!",
    thanks: "You're very welcome! I'm happy to help.",
    bye: "Goodbye! It was great chatting with you. Feel free to come back anytime!",
    default: [
      "That's an interesting question! Can you tell me more about what you're looking for?",
      "I understand what you're asking. Let me think about the best way to help you with that.",
      "Thanks for sharing that with me. Here's what I think might be helpful...",
      "That's a great question! While I don't have all the details, I can suggest a few approaches.",
      "I appreciate you asking! Based on what you've told me, here are some thoughts...",
      "Interesting! I'd love to help you explore that topic further.",
      "That's something I find fascinating too! What specific aspect interests you most?",
      "Great question! There are several ways to think about this...",
    ],
  };

  const lowerMessage = message.toLowerCase();

  // Check for keyword matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== "default" && lowerMessage.includes(keyword)) {
      return response as string;
    }
  }

  // Return random default response
  const defaultResponses = responses.default;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Generate unique ID for messages
export const generateMessageId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
