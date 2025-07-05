import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AI, ChatMessage } from '../types';
import { generateSimulatedResponse } from '../services/geminiService';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ChatModalProps {
  ai: AI;
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ ai, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  // Clear messages when a new AI is selected
  useEffect(() => {
    if(isOpen) {
        setMessages([]);
        setUserInput('');
    }
  }, [ai, isOpen]);


  const handleSendMessage = useCallback(async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
    
    // Pass the current conversation history for context
    const chatHistoryForAPI = newMessages.slice(0, -1);
    const aiResponseText = await generateSimulatedResponse(trimmedInput, ai.systemPrompt, chatHistoryForAPI);
    
    setMessages(currentMessages => [...currentMessages, { sender: 'ai', text: aiResponseText }]);
    setIsLoading(false);
  }, [userInput, isLoading, messages, ai.systemPrompt]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        style={{ animationFillMode: 'forwards' }} // custom animation in css is hard without style tag
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">Interacting as {ai.name}</h2>
            <p className="text-xs text-slate-400 mt-1">This is a simulated interaction powered by Google Gemini.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
              )}
              <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-slate-700 text-slate-200 rounded-bl-lg'}`}>
                 <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3 bg-slate-700 rounded-xl p-1">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Send a message to ${ai.name}...`}
              rows={1}
              className="w-full bg-transparent p-2 text-slate-200 placeholder:text-slate-400 focus:outline-none resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim() || isLoading}
              className="p-2.5 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:bg-blue-600 enabled:hover:bg-blue-500"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatModal;