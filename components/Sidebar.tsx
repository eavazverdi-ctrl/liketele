
import React from 'react';
import type { Contact, Message } from '../types';
import { ChatListItem } from './ChatListItem';
import { MY_USER } from '../constants';

interface SidebarProps {
  contacts: Contact[];
  messages: Record<number, Message[]>;
  onSelectChat: (contactId: number) => void;
  activeChatId: number | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ contacts, messages, onSelectChat, activeChatId }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="p-4 border-b border-black/10 flex items-center space-x-reverse space-x-3 shrink-0">
        <img src={MY_USER.avatar} alt="My Avatar" className="w-12 h-12 rounded-full object-cover"/>
        <div>
          <h2 className="text-xl font-semibold text-custom-text-primary">{MY_USER.name}</h2>
          <p className="text-sm text-custom-online font-medium">آنلاین</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {contacts.map(contact => {
          const chatMessages = messages[contact.id] || [];
          const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;
          
          return (
            <ChatListItem 
              key={contact.id}
              contact={contact}
              lastMessage={lastMessage}
              isActive={contact.id === activeChatId}
              onClick={() => onSelectChat(contact.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
