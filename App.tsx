
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import type { Contact, Message } from './types';
import { MY_USER, CONTACTS, INITIAL_MESSAGES } from './constants';
import { generateReply } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Record<number, Message[]>>(() => {
    // Lazy initialization for messages
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : INITIAL_MESSAGES;
  });
  
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  
  const handleSelectChat = (contactId: number) => {
    setActiveChatId(contactId);
  };

  const handleSendMessage = async (text: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      senderId: MY_USER.id,
    };

    const updatedMessages = {
        ...messages,
        [activeChatId]: [...(messages[activeChatId] || []), userMessage],
    };
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const activeContact = CONTACTS.find(c => c.id === activeChatId);
      if(activeContact) {
        const conversationHistory = updatedMessages[activeChatId];
        const replyText = await generateReply(activeContact.name, conversationHistory);
        
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: replyText,
          timestamp: new Date(),
          senderId: activeChatId,
        };

        setMessages(prev => ({
          ...prev,
          [activeChatId]: [...prev[activeChatId], aiMessage],
        }));
      }
    } catch (error) {
        console.error("Failed to get AI reply:", error);
        const errorMessage: Message = {
            id: Date.now() + 1,
            text: "متاسفانه نتوانستم پاسخ دهم. لطفاً دوباره تلاش کنید.",
            timestamp: new Date(),
            senderId: activeChatId,
        };
        setMessages(prev => ({
            ...prev,
            [activeChatId]: [...prev[activeChatId], errorMessage],
        }));
    } finally {
        setIsLoading(false);
    }
  };
  
  const activeContact = CONTACTS.find(c => c.id === activeChatId) || null;
  const activeMessages = activeChatId ? messages[activeChatId] || [] : [];

  return (
    <div className="flex h-screen font-sans text-custom-text-primary antialiased">
      <div className="w-full max-w-sm flex flex-col bg-custom-sidebar border-l border-gray-700 md:w-1/3 lg:w-1/4">
        <Sidebar 
          contacts={CONTACTS} 
          messages={messages}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
        />
      </div>
      <div className="flex-1 flex flex-col bg-custom-chat">
        <ChatWindow 
          contact={activeContact}
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          myUserId={MY_USER.id}
        />
      </div>
    </div>
  );
};

export default App;
