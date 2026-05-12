import React, { useState, useRef } from 'react';
import { Send, Loader2, Paperclip, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  // Automatically focus input when loading finishes
  React.useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

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
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your campus life..."
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-14 py-5 text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-white/5 focus:border-white/20 transition-all shadow-classic-lg text-white placeholder:text-white/30"
          disabled={isLoading}
        />
        <div className="absolute right-6 text-primary/20 group-focus-within/form:text-primary transition-colors">
          <Sparkles size={20} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={`
          h-[64px] px-8 rounded-[2rem] transition-all flex items-center justify-center shadow-classic active:scale-95
          ${!input.trim() || isLoading
            ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
            : 'bg-white text-black hover:bg-white/90 shadow-white/10'
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