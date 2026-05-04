import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import { chatService, ChatMessage } from '../services/chatService';
import { Bot, Sparkles } from 'lucide-react';

const ChatAssistant = () => {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Hello! I am Chloris, your AI University Concierge. How can I assist you with your studies or campus life today?", sender: 'bot', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // We need to capture the current state *before* the update for history
    const currentHistory = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // 2. Call Real API with History
    const botResponse = await chatService.sendMessage(text, currentHistory);

    // 3. Add AI Response
    setMessages(prev => [
      ...prev,
      { id: Date.now() + 1, ...botResponse }
    ]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] lg:h-[calc(100vh-200px)] flex flex-col bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-classic-xl max-w-5xl mx-auto w-full font-outfit">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl px-6 lg:px-10 py-5 lg:py-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-5">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white flex items-center justify-center text-black shadow-lg shadow-white/10">
            <Bot size={28} className="lg:w-8 lg:h-8" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg lg:text-xl tracking-tight">Chloris AI</h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></span>
              <span className="text-[11px] lg:text-[12px] font-bold text-emerald-600 uppercase tracking-wider">Active System</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-white/10 rounded-2xl text-white text-[11px] lg:text-[12px] font-bold uppercase tracking-wider border border-white/10">
          <Sparkles size={16} />
          Gemini 2.0 Flash
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-4 bg-black scroll-smooth custom-scrollbar"
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            isUser={msg.sender === 'user'}
            timestamp={msg.timestamp}
          />
        ))}
        {loading && (
          <ChatBubble
            message=""
            isUser={false}
            isTyping={true}
          />
        )}

        {/* Placeholder for when empty */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-4 py-20">
            <Bot size={64} className="mb-6 text-white" />
            <p className="text-xl font-bold text-white">Salaam! How can I assist you?</p>
            <p className="text-sm font-medium mt-2 text-white/60">Ask about campus, files, or academic help.</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 lg:p-10 bg-white/5 border-t border-white/10">
        <ChatInput onSend={handleSend} isLoading={loading} />
        <p className="text-center text-[10px] lg:text-[11px] text-white/30 mt-5 font-semibold uppercase tracking-widest leading-loose">
          Powered by Google Deepmind • Secure DIU Concierge System
        </p>
      </div>
    </div>

  );
};


export default ChatAssistant;