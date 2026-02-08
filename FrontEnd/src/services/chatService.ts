import api from './api';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const chatService = {
  // Send a message to the AI
  sendMessage: async (message: string) => {
    try {
      // POST request to your Python Chat Endpoint
      const response = await api.post('/chat/send', { 
        message: message 
      });
      
      // Return the AI's answer
      return {
        text: response.data.response, // Assuming backend sends { "response": "Hello!" }
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
    } catch (error) {
      console.error("Chat Error:", error);
      return {
        text: "I'm having trouble connecting to the server right now. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
    }
  }
};