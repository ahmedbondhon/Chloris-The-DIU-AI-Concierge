import React from 'react';
import { Bot, User } from 'lucide-react';

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
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg shadow-indigo-500/10 border border-white/5">
          <Bot size={22} className="text-white" />
        </div>
      )}

      {/* The Bubble */}
      <div className={`
        max-w-[85%] lg:max-w-[75%] p-5 rounded-[2.5rem] text-[15px] leading-relaxed relative
        ${isUser
          ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-600/20'
          : 'bg-slate-800/60 backdrop-blur-xl text-slate-100 rounded-tl-none border border-white/5'
        }
      `}>
        {isTyping ? (
          <div className="flex space-x-2 h-6 items-center px-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap font-medium tracking-tight">{message}</p>
        )}

        {/* Timestamp */}
        {timestamp && (
          <span className={`text-[9px] mt-2 block font-black uppercase tracking-[0.2em] opacity-40 ${isUser ? 'text-indigo-100' : 'text-slate-400'}`}>
            {timestamp}
          </span>
        )}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center ml-4 flex-shrink-0 shadow-sm">
          <User size={22} className="text-indigo-400" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;