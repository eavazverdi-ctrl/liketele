
import React, { useState } from 'react';
import { UpdatesIcon, CallsIcon, ChatsIcon, SettingsIcon } from './BottomNavIcons';

interface NavItemProps {
    label: string;
    Icon: React.FC<any>;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, Icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center h-14 rounded-full transition-all duration-300 ease-in-out
                ${isActive ? 'bg-app-blue text-white px-5 gap-x-2' : 'text-text-secondary w-14'}
            `}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
        >
            <Icon className="h-7 w-7 shrink-0" fill={isActive ? 'white' : 'var(--text-secondary)'} />
            {isActive && (
                <span className="font-semibold text-base whitespace-nowrap">
                    {label}
                </span>
            )}
        </button>
    );
};


const navItemsData = [
    { name: 'Updates', Icon: UpdatesIcon, label: 'به روز رسانی ها'},
    { name: 'Calls', Icon: CallsIcon, label: 'تماس ها' },
    { name: 'Chats', Icon: ChatsIcon, label: 'چت ها' },
    { name: 'Settings', Icon: SettingsIcon, label: 'تنظیمات' },
];

export const BottomNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Chats');

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto">
            <div className="flex justify-center items-center h-[76px] bg-white/70 backdrop-blur-xl rounded-full p-2.5 shadow-lg ring-1 ring-black/5 space-x-2 space-x-reverse">
                {navItemsData.map((item) => (
                    <NavItem
                        key={item.name}
                        label={item.label}
                        Icon={item.Icon}
                        isActive={activeTab === item.name}
                        onClick={() => setActiveTab(item.name)}
                    />
                ))}
            </div>
        </div>
    );
};
