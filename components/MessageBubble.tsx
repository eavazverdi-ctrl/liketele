
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
    p-3 rounded-xl max-w-lg lg:max-w-xl break-words
    ${isOwnMessage ? 'bg-custom-bubble-sent text-white' : 'bg-custom-bubble-received text-custom-text-primary shadow-md'}
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
