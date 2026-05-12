import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/chat/ChatBubble';
import ChatInput from '../components/chat/ChatInput';
import { chatService, ChatMessage } from '../services/chatService';
import { Bot, Sparkles, ChevronLeft, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const ChatAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isChatStarted = messages.length > 0;

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
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // 2. Call Real API
    const botResponse = await chatService.sendMessage(text);

    // 3. Add AI Response
    setMessages(prev => [
      ...prev,
      { id: Date.now() + 1, ...botResponse }
    ]);
    setLoading(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d0d] font-outfit relative">
      <AnimatePresence>
        {!isChatStarted ? (
          /* INITIAL GREETING STATE */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center px-4 h-full w-full relative"
          >
            {/* Small Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate('/dashboard')}
              className="absolute top-8 left-8 p-3 text-text-muted hover:text-text-primary bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 group"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest px-1">Back</span>
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-extrabold text-[#e0e0e8] mb-12 tracking-tighter text-center"
            >
              Hello, <span className="text-primary italic">Tonmoy</span>
            </motion.h1>

            <div className="w-full max-w-3xl">
              <ChatInput onSend={handleSend} isLoading={loading} />
            </div>
          </motion.div>
        ) : (
          /* ACTIVE CHAT STATE */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Minimal Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMessages([])}
                  className="p-2 text-text-muted hover:text-text-primary rounded-lg"
                  title="Back to home"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">Initial Chat</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </header>

            {/* Centered Scrollable Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto w-full pt-8 pb-32 custom-scrollbar"
            >
              <div className="max-w-3xl mx-auto px-6 space-y-2">
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
              </div>
            </div>

            {/* Floating Bottom Input */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent">
              <div className="max-w-3xl mx-auto">
                <ChatInput onSend={handleSend} isLoading={loading} />
                <p className="text-center text-[10px] text-white/10 mt-4 font-bold uppercase tracking-widest">
                  Chloris AI • Built by 13 UPB
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;