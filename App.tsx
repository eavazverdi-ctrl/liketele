
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import type { Contact, Message } from './types';
import { MY_USER, CONTACTS, INITIAL_MESSAGES } from './constants';
import { generateReply } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Record<number, Message[]>>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : INITIAL_MESSAGES;
  });
  
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  
  const handleSelectChat = (contactId: number) => {
    setActiveChatId(contactId);
  };

  const handleGoBack = () => {
    setActiveChatId(null);
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
  
  const activeContact = activeChatId ? CONTACTS.find(c => c.id === activeChatId) : null;
  const activeMessages = activeChatId ? messages[activeChatId] || [] : [];
  
  useEffect(() => {
    if (activeChatId && !activeContact) {
        console.error(`Contact with id ${activeChatId} not found.`);
        setActiveChatId(null);
    }
  }, [activeChatId, activeContact]);

  return (
    <div className="h-screen font-sans text-custom-text-primary antialiased p-0 sm:p-4 flex items-center justify-center">
      <main className="h-full w-full sm:h-auto sm:max-h-[95vh] sm:max-w-4xl sm:mx-auto bg-white/50 backdrop-blur-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {!activeChatId || !activeContact ? (
          <Sidebar 
              contacts={CONTACTS} 
              messages={messages}
              onSelectChat={handleSelectChat}
              activeChatId={activeChatId}
          />
        ) : (
          <ChatWindow 
              contact={activeContact}
              messages={activeMessages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              myUserId={MY_USER.id}
              onGoBack={handleGoBack}
          />
        )}
      </main>
    </div>
  );
};

export default App;
