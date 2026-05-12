import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  isCompact?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, isCompact }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Adjust height of textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className={cn(
      "relative w-full transition-all duration-500 max-w-3xl mx-auto px-4",
    )}>
      <div className={cn(
        "bg-[#1e1e22] border border-[#2d2d33] rounded-2xl p-2 shadow-2xl transition-all",
        "focus-within:border-white/10 focus-within:ring-0"
      )}>
        <div className="flex items-end gap-2 px-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How can I help you today?"
            className="flex-1 bg-transparent border-none outline-none text-[16px] leading-relaxed text-text-primary placeholder:text-text-muted/40 py-3 resize-none max-h-[400px] custom-scrollbar"
            disabled={isLoading}
          />

          <div className="flex items-center gap-1.5 mb-1.5 pr-1">
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              className={cn(
                "p-2 rounded-lg transition-all",
                !input.trim() || isLoading
                  ? "text-text-muted/10 cursor-not-allowed"
                  : "text-primary hover:bg-primary/10"
              )}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;