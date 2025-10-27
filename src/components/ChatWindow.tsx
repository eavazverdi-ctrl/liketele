import React, { useRef, useEffect } from 'react';
import type { Contact, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { BackArrowIcon, PhoneIcon, VideoIcon } from './icons';

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
    <div className="flex flex-col h-full w-full bg-[#F9F9F9]">
      <header className="shrink-0 bg-white shadow-sm z-10">
        <div className="p-4 flex justify-between items-center">
          <button onClick={onGoBack} className="text-app-blue p-1" aria-label="بازگشت">
            <BackArrowIcon />
          </button>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover"/>
            <div className="text-center">
              <h2 className="text-base font-bold text-text-primary">{contact.name}</h2>
              <p className="text-xs text-text-secondary">{isLoading ? 'در حال تایپ...' : 'آنلاین'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
             <button className="text-app-blue p-1" aria-label="تماس تصویری">
                <VideoIcon />
             </button>
             <button className="text-app-blue p-1" aria-label="تماس صوتی">
                <PhoneIcon />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-4 overflow-y-auto space-y-4 pt-4 pb-2">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === myUserId} />
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-light-gray text-text-primary p-3 rounded-2xl rounded-bl-lg">
                <div className="flex items-center justify-center space-x-reverse space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-2 bg-white">
        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};