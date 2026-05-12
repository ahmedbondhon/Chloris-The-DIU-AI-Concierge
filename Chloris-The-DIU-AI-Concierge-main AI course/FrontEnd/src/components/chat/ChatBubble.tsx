import React from 'react';
import { Bot, User } from 'lucide-react';
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
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-${isUser ? 'right' : 'left'}-4 duration-500`}>
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 flex-shrink-0 shadow-lg shadow-white/10 border border-white/5">
          <Bot size={22} className="text-black" />
        </div>
      )}

      {/* The Bubble */}
      <div className={`
        max-w-[85%] lg:max-w-[75%] p-5 rounded-[2rem] text-[15px] leading-relaxed relative
        ${isUser
          ? 'bg-white text-black rounded-tr-none shadow-classic-lg'
          : 'bg-white/10 text-white rounded-tl-none border border-white/10 shadow-classic'
        }
      `}>
        {isTyping ? (
          <div className="flex space-x-2 h-6 items-center px-1">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 font-medium tracking-tight whitespace-pre-wrap">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="font-medium tracking-tight mb-1 list-none before:content-['•'] before:mr-2">{children}</li>,
                strong: ({ children }) => <strong className={cn("font-bold", isUser ? "text-black" : "text-white")}>{children}</strong>,
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-white/5 shadow-sm">
                    <table className="min-w-full text-left border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-white/10 border-b border-white/10">{children}</thead>,
                th: ({ children }) => <th className="p-3 text-[11px] lg:text-[12px] font-bold uppercase tracking-wider text-white">{children}</th>,
                td: ({ children }) => <td className="p-3 text-[13px] lg:text-[14px] font-medium border-b border-white/5 last:border-b-0 text-white/60">{children}</td>,
                tr: ({ children }) => <tr className="hover:bg-white/5 transition-colors">{children}</tr>,
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}
        {timestamp && (
          <span className={`text-[9px] mt-2 block font-bold uppercase tracking-wider opacity-40 ${isUser ? 'text-white/80' : 'text-slate-400'}`}>
            {timestamp}
          </span>
        )}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center ml-4 flex-shrink-0 shadow-classic border border-white/10">
          <User size={22} className="text-black" />
        </div>
      )}
    </div>

  );
};

export default ChatBubble;