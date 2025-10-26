import React, { useState } from 'react';
import { SendIcon, AttachmentIcon, MicIcon } from './icons';

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
       <button 
          type="button" 
          className="text-text-secondary hover:text-app-blue p-2"
          aria-label="ضبط صدا"
        >
          <MicIcon />
        </button>
        <button type="button" className="text-text-secondary hover:text-app-blue p-2" aria-label="افزودن فایل">
          <AttachmentIcon />
        </button>
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="پیام..."
          className="w-full bg-light-gray rounded-xl py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-app-blue/50"
          disabled={isLoading}
        />
        <button 
            type="submit" 
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-app-blue text-white rounded-full w-9 h-9 flex items-center justify-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-app-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            disabled={!text.trim() || isLoading}
            aria-label="ارسال پیام"
            >
            <SendIcon />
        </button>
      </div>
    </form>
  );
};