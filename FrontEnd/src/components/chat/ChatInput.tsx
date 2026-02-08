import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-slate-200 bg-white p-4 flex gap-2"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Chloris about your grades, schedule, or bookings..."
        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        disabled={isLoading}
      />
      
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={`
          p-3 rounded-full transition-all flex items-center justify-center shadow-sm
          ${!input.trim() || isLoading 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
          }
        `}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Send size={20} className="ml-0.5" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;