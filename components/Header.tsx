import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-slate-700/50">
       <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-12 h-12 text-blue-400" />
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
            AI Universe Explorer
        </h1>
       </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Discover and interact with a curated collection of the world's leading AI models.
      </p>
    </header>
  );
};

export default Header;