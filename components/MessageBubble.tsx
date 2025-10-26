
import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(date));
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  const bubbleClasses = `
    p-3 rounded-2xl max-w-sm break-words
    ${isOwnMessage 
      ? 'bg-sent-bubble text-text-dark rounded-br-lg' 
      : 'bg-received-bubble text-text-dark rounded-bl-lg'
    }
  `;
  const containerClasses = `flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`;
  
  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <p>{message.text}</p>
      </div>
      <p className="text-xs text-text-muted/80 mt-1.5 px-1">{formatTime(message.timestamp)}</p>
    </div>
  );
};