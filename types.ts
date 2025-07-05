
export enum AICategory {
  Text = 'Text Generation',
  Image = 'Image Generation',
  Code = 'Code Generation',
  Audio = 'Audio & Music',
  Multimodal = 'Multimodal',
  Video = 'Video Generation'
}

export interface AI {
  id: string;
  name: string;
  creator: string;
  description: string;
  category: AICategory;
  systemPrompt: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
