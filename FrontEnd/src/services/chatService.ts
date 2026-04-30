import api from './api';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const chatService = {
  // send user query to backend
  sendMessage: async (message: string, history: any[] = []) => {
    try {
      const response = await api.post('chat/query', {
        message: message,
        history: history
      });

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