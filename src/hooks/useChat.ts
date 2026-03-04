import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { achievements, courses, studentLife, events, hiringStats } from '../data/content';
import { programSectors } from '../data/programs';

// Initialize the Gemini API client
// Note: In this environment, the API key is injected via Vite's define plugin
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

// Prepare the RAG context (Knowledge Base)
const knowledgeBase = `
EduReach University Information:
- Achievements: ${JSON.stringify(achievements)}
- General Courses: ${JSON.stringify(courses)}
- Detailed Program Sectors (Important!): ${JSON.stringify(programSectors)}
- Student Life: ${JSON.stringify(studentLife)}
- Upcoming Events: ${JSON.stringify(events)}
- Hiring Statistics: ${JSON.stringify(hiringStats)}
- Contact Info: Phone: +1 (555) 123-4567, Email: admissions@edureach.edu, Address: 123 University Ave, Tech City.
`;

const systemInstruction = `
You are the official AI Voice Counselor and Chat Agent for EduReach University.
Your goal is to assist prospective and current students with information about the university.

Use the following knowledge base to answer student questions accurately.
If a user asks something outside of this knowledge base, politely inform them that you don't have that specific information and offer to connect them with a human counselor.

Keep your answers concise, friendly, and professional. Format your responses using markdown for readability (e.g., bullet points for lists).

Knowledge Base:
${knowledgeBase}
`;

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init', 
      role: 'model', 
      text: 'Hello! I am the EduReach AI Counselor. How can I help you today? You can ask me about our courses, campus life, or admission stats.' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // We use a ref to keep the chat session alive across renders
  const chatRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the chat session with the system instruction
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || !chatRef.current) return;

    // Add user message to state
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Send message to Gemini
      const response = await chatRef.current.sendMessage({ message: text });
      
      // Add model response to state
      const modelMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || 'I am sorry, I could not generate a response.' 
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), role: 'model', text: 'Sorry, I encountered a network error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};
