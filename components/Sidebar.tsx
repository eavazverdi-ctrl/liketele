
import React from 'react';
import type { Contact, Message } from '../types';
import { ChatListItem } from './ChatListItem';
import { PlusIcon, SearchIcon, FilterIcon, KebabMenuIcon, VerifiedIcon } from './icons';
import { BottomNavBar } from './BottomNavBar';

interface SidebarProps {
  contacts: Contact[];
  messages: Record<number, Message[]>;
  onSelectChat: (contactId: number) => void;
  activeChatId: number | null;
}

const stories = [
    { name: 'Add Story', avatar: null },
    { name: 'Henry', avatar: 'https://i.pravatar.cc/150?u=henry', verified: true },
    { name: 'Albert Flores', avatar: 'https://i.pravatar.cc/150?u=albert' },
    { name: 'Floyd', avatar: 'https://i.pravatar.cc/150?u=floyd' },
    { name: 'Kathryn', avatar: 'https://i.pravatar.cc/150?u=kathryn' },
];

export const Sidebar: React.FC<SidebarProps> = ({ contacts, messages, onSelectChat, activeChatId }) => {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-[#49AAFF] to-[#188BEF] relative">
      <header className="p-4 sm:p-6" dir="ltr">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">All Story</h1>
          <button className="text-white">
            <KebabMenuIcon />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
            {stories.map((story, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 shrink-0 w-[72px] text-center">
                    <button className={`w-16 h-16 rounded-full flex items-center justify-center ${index === 0 ? 'border-2 border-dashed border-white/50' : 'border-2 border-white bg-white/20'}`}>
                        {story.avatar ? (
                            <img src={story.avatar} alt={story.name} className="w-[58px] h-[58px] rounded-full object-cover" />
                        ) : (
                            <PlusIcon className="w-6 h-6 text-white/80" />
                        )}
                    </button>
                    <span className="text-xs text-white/90 flex items-center justify-center gap-1">
                      {story.name}
                      {story.verified && <VerifiedIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                    </span>
                </div>
            ))}
        </div>
      </header>

      <div className="p-4 pt-2" dir="ltr">
        <div className="flex items-center space-x-2">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Select or search for recent chats..."
                    className="w-full bg-white rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-app-blue/50 shadow-md"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon className="w-5 h-5 text-text-secondary opacity-70" />
                </div>
            </div>
            <button className="p-3 bg-[#188BEF]/10 rounded-xl flex-shrink-0">
                <FilterIcon className="w-5 h-5 text-app-blue" />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pt-2 pb-28 bg-white rounded-t-[2rem]">
        {contacts.map((contact) => {
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
      <BottomNavBar />
    </div>
  );
};
