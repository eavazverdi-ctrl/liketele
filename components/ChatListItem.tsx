import React from 'react';
import type { Contact, Message } from '../types';

interface ChatListItemProps {
  contact: Contact;
  lastMessage: Message | null;
  isActive: boolean;
  onClick: () => void;
}

const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));

    if (diffDays > 0) {
        return 'دیروز';
    }
    return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
};

export const ChatListItem: React.FC<ChatListItemProps> = ({ contact, lastMessage, isActive, onClick }) => {
  const itemClasses = `
    flex items-center p-3 m-2 rounded-xl cursor-pointer transition-colors duration-200
    ${isActive ? 'bg-light-gray' : 'hover:bg-light-gray/50'}
  `;
  
  const truncatedText = lastMessage?.text ? 
    (lastMessage.text.length > 30 ? lastMessage.text.substring(0, 30) + '...' : lastMessage.text) 
    : 'بدون پیام';

  return (
    <div className={itemClasses} onClick={onClick}>
      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover ml-4" />
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-text-primary text-base">{contact.name}</h3>
          {lastMessage && <p className="text-xs text-text-secondary">{formatTime(new Date(lastMessage.timestamp))}</p>}
        </div>
        <p className="text-sm text-text-secondary truncate mt-1">{truncatedText}</p>
      </div>
    </div>
  );
};