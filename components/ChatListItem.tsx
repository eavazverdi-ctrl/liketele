
import React from 'react';
import type { Contact, Message } from '../types';

interface ChatListItemProps {
  contact: Contact;
  lastMessage: Message | null;
  isActive: boolean;
  unreadCount: number;
  onClick: () => void;
}

const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));

    if (diffDays > 0) {
        return 'دیروز';
    }
    return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date);
};

export const ChatListItem: React.FC<ChatListItemProps> = ({ contact, lastMessage, isActive, unreadCount, onClick }) => {
  const itemClasses = `
    flex items-center p-3 mx-2 rounded-2xl cursor-pointer transition-colors duration-200
    ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}
  `;
  
  const truncatedText = lastMessage?.text ? 
    (lastMessage.text.length > 30 ? lastMessage.text.substring(0, 30) + '...' : lastMessage.text) 
    : 'بدون پیام';

  return (
    <div className={itemClasses} onClick={onClick}>
      <img src={contact.avatar} alt={contact.name} className="w-14 h-14 rounded-full object-cover ml-4" />
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-text-dark text-md">{contact.name}</h3>
          {lastMessage && <p className="text-xs text-text-muted">{formatTime(new Date(lastMessage.timestamp))}</p>}
        </div>
        <div className="flex justify-between items-start mt-1">
          <p className="text-sm text-text-muted truncate">{truncatedText}</p>
          {unreadCount > 2 && <span className="text-xs bg-unread-badge text-white font-semibold rounded-full w-5 h-5 flex items-center justify-center shrink-0">{unreadCount}</span>}
        </div>
      </div>
    </div>
  );
};