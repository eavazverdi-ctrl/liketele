import React from 'react';
import type { Contact, Message } from '../types';
import { ChatListItem } from './ChatListItem';
import { SearchIcon } from './icons';

interface SidebarProps {
  contacts: Contact[];
  messages: Record<number, Message[]>;
  onSelectChat: (contactId: number) => void;
  activeChatId: number | null;
}

const FilterTabs: React.FC = () => {
    const tabs = ["دوستان", "معلم‌ها", "گروه‌ها", "بیشتر"];
    return (
        <div className="flex items-center space-x-reverse space-x-2 px-4">
            {tabs.map((tab, index) => (
                <button 
                    key={tab} 
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors
                        ${index === 0 
                            ? 'bg-primary-accent text-white' 
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ contacts, messages, onSelectChat, activeChatId }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <header className="starry-night shrink-0 pb-4 relative">
        <div className="twinkling" />
        <div className="pt-12 px-4 flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-text-light">پیام‌ها (32)</h1>
            <button className="text-white/80 hover:text-white">
                <SearchIcon />
            </button>
        </div>
        <FilterTabs />
      </header>
      <div className="flex-1 overflow-y-auto bg-light-bg rounded-t-3xl -mt-4 pt-4 relative">
         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-100/30 to-transparent pointer-events-none" />
        {contacts.map((contact, index) => {
          const chatMessages = messages[contact.id] || [];
          const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;
          
          return (
            <ChatListItem 
              key={contact.id}
              contact={contact}
              lastMessage={lastMessage}
              isActive={contact.id === activeChatId}
              unreadCount={index === 0 ? 1 : (index === 1 ? 2 : 5)} // Decorative unread count
              onClick={() => onSelectChat(contact.id)}
            />
          );
        })}
      </div>
    </div>
  );
};