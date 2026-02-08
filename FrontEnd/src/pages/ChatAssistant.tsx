import React, { useState } from 'react';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am Chloris. How can I help you today?", isUser: false }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (text: string) => {
    // 1. Add User Message
    const newMessage = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);

    // 2. Simulate AI Response (We will connect to Python later)
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, text: "I am a demo AI. Connect me to the backend to make me smart!", isUser: false }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-700">Chloris AI Chat</h2>
        <p className="text-xs text-slate-500">Ask about grades, policies, or locations</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        {loading && <ChatBubble message="" isUser={false} isTyping={true} />}
      </div>

      <ChatInput onSend={handleSend} isLoading={loading} />
    </div>
  );
};

export default ChatAssistant;