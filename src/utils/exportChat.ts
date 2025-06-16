import { ChatMessage } from "./chatApi";

export const exportChatAsText = (
  messages: ChatMessage[],
  fileName?: string,
): void => {
  // Create formatted text content
  const textContent = messages
    .map((message) => {
      const timestamp = message.timestamp.toLocaleString();
      const sender = message.sender === "user" ? "You" : "ChatBot AI";
      return `[${timestamp}] ${sender}: ${message.content}`;
    })
    .join("\n\n");

  // Add header
  const header = `ChatBot AI - Conversation Export\nExported on: ${new Date().toLocaleString()}\n${"=".repeat(50)}\n\n`;
  const fullContent = header + textContent;

  // Create and download file
  const blob = new Blob([fullContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download =
    fileName || `chat-export-${new Date().toISOString().split("T")[0]}.txt`;

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
};

export const exportChatAsJSON = (
  messages: ChatMessage[],
  fileName?: string,
): void => {
  const exportData = {
    exportDate: new Date().toISOString(),
    messageCount: messages.length,
    messages: messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp.toISOString(),
    })),
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download =
    fileName || `chat-export-${new Date().toISOString().split("T")[0]}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
