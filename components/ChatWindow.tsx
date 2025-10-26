
import React, { useRef, useEffect } from 'react';
import type { Contact, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface ChatWindowProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  myUserId: number;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage, isLoading, myUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center text-custom-text-secondary bg-custom-chat">
        <p>یک چت را برای شروع پیام‌رسانی انتخاب کنید.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center p-3 border-b border-gray-700 bg-custom-sidebar shadow-md z-10">
        <img src={contact.avatar} alt={contact.name} className="w-11 h-11 rounded-full object-cover ml-4" />
        <div>
          <h2 className="text-lg font-semibold text-custom-text-primary">{contact.name}</h2>
          <p className="text-sm text-gray-400">{isLoading ? 'در حال تایپ...' : 'آنلاین'}</p>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === myUserId} />
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-custom-bubble-received text-white p-3 rounded-lg max-w-md">
                <div className="flex items-center justify-center space-x-reverse space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 bg-custom-sidebar">
        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};
