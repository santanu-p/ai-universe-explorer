
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateSimulatedResponse = async (
  userPrompt: string, 
  systemInstruction: string,
  chatHistory: ChatMessage[]
): Promise<string> => {
  if (!API_KEY) {
    return "Error: Gemini API key is not configured. Please check your environment variables.";
  }

  try {
    const model = 'gemini-2.5-flash-preview-04-17';
    
    // Convert our chat history to Gemini's format
    const history = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    // Start a new chat session with the full history
    const chat = ai.chats.create({
        model,
        config: { systemInstruction },
        history
    });

    const response = await chat.sendMessage({message: userPrompt});
    
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return "Sorry, I encountered an error trying to generate a response. Please try again later.";
  }
};
