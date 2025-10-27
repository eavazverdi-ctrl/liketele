import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';
import { MY_USER } from '../constants';

const API_KEY = process.env.API_KEY;

// We create the AI instance, but if the API_KEY is missing,
// the generateContent call will fail gracefully, which is handled in the App component.
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateReply = async (contactName: string, conversationHistory: Message[]): Promise<string> => {
    const formattedHistory = conversationHistory.map(msg => 
        `${msg.senderId === MY_USER.id ? MY_USER.name : contactName}: ${msg.text}`
    ).join('\n');

    const prompt = `You are ${contactName}, chatting with your friend "${MY_USER.name}" in a sleek, modern messenger app. Provide a short, natural, and friendly reply to the last message. Keep your tone informal and contemporary, as if you're sending a real text message.

    Chat History:
    ${formattedHistory}
    
    Your Reply (${contactName}):`;

    try {
        if (!API_KEY) {
            return "کلید API تنظیم نشده است. لطفاً برای فعال‌سازی چت، کلید خود را فراهم کنید.";
        }
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return "متاسفانه مشکلی پیش آمد. نمی‌توانم پاسخ دهم.";
    }
};