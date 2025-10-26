import React, { useRef, useEffect } from 'react';
import type { Contact, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ArrowRightIcon } from './icons';

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
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-3 border-b border-white/20 z-10 shrink-0 bg-white/30 backdrop-blur-xl">
        <div className="flex items-center">
            <img src={contact.avatar} alt={contact.name} className="w-11 h-11 rounded-full object-cover ml-4" />
            <div>
              <h2 className="text-lg font-semibold text-custom-text-primary">{contact.name}</h2>
              <p className={`text-sm ${isLoading ? 'text-sky-600' : 'text-custom-text-secondary'}`}>{isLoading ? 'در حال تایپ...' : 'آنلاین'}</p>
            </div>
        </div>
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-black/10 transition-colors" aria-label="بازگشت">
            <ArrowRightIcon />
        </button>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === myUserId} />
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-white/50 backdrop-blur-md text-custom-text-primary p-3 rounded-xl max-w-lg shadow-lg border border-white/20">
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
      <footer className="p-3 border-t border-white/20 shrink-0 bg-white/30 backdrop-blur-xl">
        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};