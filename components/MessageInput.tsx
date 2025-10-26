
import React, { useState } from 'react';
import { SendIcon, PaperclipIcon, MicIcon } from './icons';

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
    <form onSubmit={handleSubmit} className="flex items-center space-x-reverse space-x-3 bg-dark-bg/50 backdrop-blur-sm rounded-xl p-2 border border-white/10">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="پیام خود را تایپ کنید..."
        className="flex-1 bg-transparent text-text-light placeholder:text-text-muted focus:outline-none px-2"
        disabled={isLoading}
      />
      <div className="flex items-center space-x-reverse space-x-2">
        <button type="button" className="text-text-muted hover:text-white" aria-label="افزودن فایل">
            <PaperclipIcon />
        </button>
         <button type="button" className="text-text-muted hover:text-white" aria-label="ضبط صدا">
            <MicIcon />
        </button>
        <button 
          type="submit" 
          className="bg-primary-accent text-white rounded-lg w-10 h-10 flex items-center justify-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          disabled={!text.trim() || isLoading}
          aria-label="ارسال پیام"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};