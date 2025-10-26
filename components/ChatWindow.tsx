import React, { useRef, useEffect } from 'react';
import type { Contact, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ChevronIcon, PhoneIcon, KebabMenuIcon } from './icons';

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  myUserId: number;
  onGoBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage, isLoading, myUserId, onGoBack }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full w-full starry-night relative">
      <div className="twinkling" />
      <header className="flex items-center p-3 z-10 shrink-0 pt-12">
        <button onClick={onGoBack} className="p-2" aria-label="بازگشت">
            <ChevronIcon />
        </button>
        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover mr-2" />
        <div className="flex-1">
            <h2 className="text-lg font-bold text-text-light">{contact.name}</h2>
            <p className={`text-sm ${isLoading ? 'text-primary-accent' : 'text-text-muted'}`}>{isLoading ? 'در حال تایپ...' : 'آنلاین'}</p>
        </div>
        <div className="flex items-center space-x-2">
            <button className="p-2 text-text-light"><PhoneIcon /></button>
            <button className="p-2 text-text-light"><KebabMenuIcon /></button>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === myUserId} />
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-received-bubble text-text-primary p-3 rounded-2xl rounded-bl-lg">
                <div className="flex items-center justify-center space-x-reverse space-x-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-3 z-10 shrink-0">
        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};