import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  isTyping
}) => {
  return (
    <div className={cn(
      "w-full mb-12 group animate-in fade-in slide-in-from-bottom-2 duration-700",
      isUser ? "flex flex-col items-end" : "flex flex-col items-start"
    )}>
      {/* Message Content */}
      <div className={cn(
        "max-w-full lg:max-w-[85%] transition-all duration-500",
        isUser
          ? "bg-[#1e1e22] text-[#e0e0e8] px-4 py-2 rounded-2xl border border-[#2d2d33] shadow-sm text-[14px] font-medium"
          : "text-[#e0e0e8] text-[16px] leading-[1.8] font-light"
      )}>
        {isTyping ? (
          <div className="flex space-x-2 h-6 items-center px-1">
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className={cn(
            "prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#1a1a1c] prose-pre:border prose-pre:border-border",
            !isUser && "selection:bg-primary/30"
          )}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
                code: ({ children, className }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !match ? (
                    <code className="bg-[#1a1a1c] px-1.5 py-0.5 rounded text-primary/80 font-mono text-[0.9em]">{children}</code>
                  ) : (
                    <code className={className}>{children}</code>
                  );
                },
                pre: ({ children }) => <pre className="p-6 rounded-2xl overflow-x-auto my-6 border border-white/5 bg-[#0d0d0f] shadow-2xl">{children}</pre>,
                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-white mb-3 mt-6">{children}</h2>,
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Action Bar for AI */}
      {!isUser && !isTyping && (
        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-[-4px]">
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-all" title="Copy response">
            <Copy size={16} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-all" title="Good response">
            <ThumbsUp size={16} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-all" title="Bad response">
            <ThumbsDown size={16} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-all" title="Regenerate">
            <RotateCcw size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Timestamp for User */}
      {isUser && timestamp && (
        <span className="text-[10px] mt-2 font-bold text-text-muted/20 uppercase tracking-widest mr-1">
          {timestamp}
        </span>
      )}
    </div>
  );
};

export default ChatBubble;