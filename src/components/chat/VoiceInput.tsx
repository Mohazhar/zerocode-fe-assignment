import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { voiceRecognition } from "../../utils/speechRecognition";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  disabled = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsSupported(voiceRecognition.isVoiceSupported());
  }, []);

  const startListening = async () => {
    if (!isSupported || disabled) return;

    try {
      setError(null);
      setIsListening(true);

      const result = await voiceRecognition.startListening();

      if (result.transcript) {
        onTranscript(result.transcript);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Voice recognition failed");
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    voiceRecognition.stopListening();
    setIsListening(false);
  };

  if (!isSupported) {
    return (
      <div className="tooltip-container">
        <button
          disabled
          className="p-2 text-gray-300 dark:text-gray-600 cursor-not-allowed"
          title="Voice input not supported in this browser"
        >
          <MicOff className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isListening
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse"
            : disabled
              ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        title={
          isListening
            ? "Stop recording"
            : disabled
              ? "Voice input disabled"
              : "Start voice input"
        }
      >
        {isListening ? (
          <div className="relative">
            <Mic className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {/* Voice level indicator when listening */}
      {isListening && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
            <Volume2 className="w-3 h-3 text-red-600 dark:text-red-400" />
            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
              Listening...
            </span>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
