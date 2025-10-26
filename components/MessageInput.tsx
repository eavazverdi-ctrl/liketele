
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-reverse space-x-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="پیام خود را بنویسید..."
        className="flex-1 bg-white/50 text-custom-text-primary placeholder-gray-600/90 rounded-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-white/80 border border-white/30 backdrop-blur-sm"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="bg-sky-500/80 text-white rounded-full p-3 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-sky-200/50 disabled:bg-sky-500/40 disabled:cursor-not-allowed transition-colors"
        disabled={!text.trim() || isLoading}
        aria-label="ارسال پیام"
      >
        <SendIcon />
      </button>
    </form>
  );
};
