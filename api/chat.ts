import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

// Self-contained types for the serverless function
interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface RequestBody {
    userPrompt: string;
    systemInstruction: string;
    chatHistory: ChatMessage[];
}

// Vercel will automatically turn this into a serverless function at the /api/chat endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("Gemini API key not found in server environment.");
        return res.status(500).json({ error: "Server configuration error. API key is missing." });
    }

    try {
        const { userPrompt, systemInstruction, chatHistory } = req.body as RequestBody;

        if (!userPrompt || !systemInstruction || !Array.isArray(chatHistory)) {
             return res.status(400).json({ error: "Invalid request body. Required fields are missing." });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const model = 'gemini-2.5-flash-preview-04-17';
        
        const history = chatHistory.map((msg: ChatMessage) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const chat = ai.chats.create({
            model,
            config: { systemInstruction },
            history
        });

        const geminiResponse = await chat.sendMessage({message: userPrompt});
        const responseText = geminiResponse.text;
        
        res.status(200).json({ response: responseText });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ error: "Failed to generate response from AI.", details: errorMessage });
    }
}
