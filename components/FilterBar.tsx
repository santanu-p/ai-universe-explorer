
import React from 'react';
import { AICategory } from '../types';
import { AI_CATEGORIES } from '../constants';
import { SearchIcon } from './icons/SearchIcon';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: AICategory | 'All';
  onCategoryChange: (category: AICategory | 'All') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  const allCategories: (AICategory | 'All')[] = ['All', ...AI_CATEGORIES];

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search for an AI by name, creator, or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
