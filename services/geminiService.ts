import { ChatMessage } from "../types";

export const generateSimulatedResponse = async (
  userPrompt: string, 
  systemInstruction: string,
  chatHistory: ChatMessage[]
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPrompt,
        systemInstruction,
        chatHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'API request failed with status ' + response.status }));
      console.error("Backend error:", errorData);
      return `Sorry, there was an error communicating with the backend: ${errorData.error}`;
    }

    const data = await response.json();
    return data.response;

  } catch (error) {
    console.error("Error communicating with the backend:", error);
    return "Sorry, I encountered a network error trying to generate a response. Please check your connection and try again.";
  }
};
