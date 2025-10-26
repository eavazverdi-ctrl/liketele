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

    const prompt = `شما ${contactName} هستید و در حال چت با دوست خود، "${MY_USER.name}"، در یک پیام‌رسان هستید. لطفاً یک پاسخ کوتاه، طبیعی و دوستانه به آخرین پیام بدهید. لحن خود را غیررسمی نگه دارید.

    تاریخچه چت:
    ${formattedHistory}
    
    پاسخ شما (${contactName}):`;

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