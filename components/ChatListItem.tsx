
import React from 'react';
import type { Contact, Message } from '../types';

interface ChatListItemProps {
  contact: Contact;
  lastMessage: Message | null;
  isActive: boolean;
  onClick: () => void;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(date);
};

export const ChatListItem: React.FC<ChatListItemProps> = ({ contact, lastMessage, isActive, onClick }) => {
  const itemClasses = `
    flex items-center p-3 cursor-pointer transition-colors duration-200
    ${isActive ? 'bg-sky-500/20' : 'hover:bg-black/5'}
  `;
  
  const truncatedText = lastMessage?.text ? 
    (lastMessage.text.length > 30 ? lastMessage.text.substring(0, 30) + '...' : lastMessage.text) 
    : 'بدون پیام';

  return (
    <div className={itemClasses} onClick={onClick}>
      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover ml-4" />
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-custom-text-primary">{contact.name}</h3>
          {lastMessage && <p className="text-xs text-custom-text-secondary">{formatTime(new Date(lastMessage.timestamp))}</p>}
        </div>
        <p className="text-sm text-custom-text-secondary truncate">{truncatedText}</p>
      </div>
    </div>
  );
};
