import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(date));
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  const bubbleClasses = `
    p-3 rounded-2xl max-w-xs sm:max-w-sm break-words
    ${isOwnMessage 
      ? 'bg-app-blue text-white rounded-br-md' 
      : 'bg-light-gray text-text-primary rounded-bl-md'
    }
  `;
  const containerClasses = `flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`;
  
  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm">{message.text}</p>
      </div>
      <p className="text-xs text-text-secondary mt-1.5 px-1">{formatTime(message.timestamp)}</p>
    </div>
  );
};