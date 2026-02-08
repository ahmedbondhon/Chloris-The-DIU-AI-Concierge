import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean; // If true, shows the "..." animation
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser, 
  timestamp,
  isTyping 
}) => {
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Icon (Only show on left) */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
          <Bot size={18} className="text-blue-600" />
        </div>
      )}

      {/* The Bubble */}
      <div className={`
        max-w-[80%] p-3 rounded-2xl shadow-sm text-sm leading-relaxed
        ${isUser 
          ? 'bg-blue-600 text-white rounded-br-none' 
          : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
        }
      `}>
        {isTyping ? (
          <div className="flex space-x-1 h-5 items-center">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message}</p>
        )}
        
        {/* Timestamp */}
        {timestamp && (
          <span className={`text-[10px] mt-1 block opacity-70 ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
            {timestamp}
          </span>
        )}
      </div>

      {/* User Icon (Only show on right) */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center ml-2 flex-shrink-0">
          <User size={18} className="text-slate-600" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;