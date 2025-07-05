
import React from 'react';
import { AI } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface AICardProps {
  ai: AI;
  onSelectAI: (ai: AI) => void;
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Text Generation': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
        case 'Image Generation': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'Code Generation': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'Audio & Music': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
        case 'Multimodal': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'Video Generation': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
}

const AICard: React.FC<AICardProps> = ({ ai, onSelectAI }) => {
  return (
    <div 
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg flex flex-col group p-6 transition-all duration-300 hover:border-blue-500/70 hover:shadow-blue-900/50 hover:-translate-y-1"
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{ai.name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(ai.category)}`}>
                {ai.category}
            </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">by {ai.creator}</p>
        <p className="text-slate-300 mt-4 text-sm leading-relaxed">
          {ai.description}
        </p>
      </div>
      <div className="mt-6">
        <button 
          onClick={() => onSelectAI(ai)}
          className="w-full flex items-center justify-center gap-2 bg-slate-700/80 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 group-hover:bg-blue-600"
        >
          Simulate Interaction
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default AICard;
