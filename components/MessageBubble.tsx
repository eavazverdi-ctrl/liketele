
import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(date);
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  const bubbleClasses = `
    p-3 rounded-xl max-w-lg lg:max-w-xl break-words shadow-lg
    ${isOwnMessage 
      ? 'bg-sky-500/80 text-white border border-sky-400/50' 
      : 'bg-white/50 text-custom-text-primary backdrop-blur-md border border-white/20'
    }
  `;
  const containerClasses = `flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`;
  
  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <p>{message.text}</p>
      </div>
      <p className="text-xs text-custom-text-secondary mt-1.5 px-1">{formatTime(new Date(message.timestamp))}</p>
    </div>
  );
};
