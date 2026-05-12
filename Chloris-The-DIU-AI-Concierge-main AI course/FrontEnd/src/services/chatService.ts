import api from './api';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const chatService = {
  // Send a message to the AI
  sendMessage: async (message: string, history: any[] = []) => {
    try {
      // POST request to your Python Chat Endpoint (/chat/query as per backend)
      const response = await api.post('/chat/query', {
        message: message,
        history: history
      });

      // Return the AI's answer
      // Backend returns: { "response": "answer text", "sources": [...] }
      return {
        text: response.data.response,
        sender: 'bot' as const,
        timestamp: new Date().toLocaleTimeString(),
      };
    } catch (error) {
      console.error("Chat Error:", error);
      return {
        text: "I'm having trouble connecting to the server right now. Please try again.",
        sender: 'bot' as const,
        timestamp: new Date().toLocaleTimeString(),
      };
    }
  }
};