export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

export class VoiceRecognition {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean;
  private isListening: boolean = false;

  constructor() {
    this.isSupported =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

    if (this.isSupported) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";
    this.recognition.maxAlternatives = 1;
  }

  public isVoiceSupported(): boolean {
    return this.isSupported;
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  public startListening(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error("Speech recognition not supported"));
        return;
      }

      if (this.isListening) {
        reject(new Error("Already listening"));
        return;
      }

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        const result = event.results[0];
        if (result) {
          const transcript = result[0].transcript;
          const confidence = result[0].confidence;
          resolve({ transcript, confidence });
        } else {
          reject(new Error("No speech detected"));
        }
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        reject(error);
      }
    });
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

// Global instance
export const voiceRecognition = new VoiceRecognition();

// Add type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
