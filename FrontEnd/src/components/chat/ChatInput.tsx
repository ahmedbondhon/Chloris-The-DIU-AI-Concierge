import React, { useState } from 'react';
import { Send, Loader2, Paperclip, Sparkles } from 'lucide-react';

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
      className="flex gap-4 items-center max-w-4xl mx-auto w-full group/form"
    >
      <div className="flex-1 relative flex items-center">
        <button
          type="button"
          className="absolute left-5 text-slate-500 hover:text-white transition-colors z-20"
          title="Attach a file"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your campus life..."
          className="w-full bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] pl-14 pr-14 py-5 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-slate-800/80 focus:border-indigo-500/30 transition-all shadow-2xl shadow-black/20 text-white placeholder:text-slate-600"
          disabled={isLoading}
        />
        <div className="absolute right-6 text-indigo-500/20 group-focus-within/form:text-indigo-400 transition-colors">
          <Sparkles size={20} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={`
          h-[64px] px-8 rounded-[2.5rem] transition-all flex items-center justify-center shadow-xl active:scale-95
          ${!input.trim() || isLoading
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none border border-white/5'
            : 'bg-white text-slate-900 hover:bg-indigo-50 hover:shadow-white/5'
          }
        `}
      >
        {isLoading ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Send size={22} />
        )}
      </button>
    </form>
  );
};

export default ChatInput;