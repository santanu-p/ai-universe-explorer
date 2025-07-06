
import React, { useState, useMemo } from 'react';
import { AI, AICategory } from './types';
import { ALL_AIS } from './constants';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import AICard from './components/AICard';
import ChatModal from './components/ChatModal';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AICategory | 'All'>('All');
  const [activeAI, setActiveAI] = useState<AI | null>(null);

  const filteredAIs = useMemo(() => {
    return ALL_AIS.filter(ai => {
      const matchesCategory = selectedCategory === 'All' || ai.category === selectedCategory;
      const matchesSearch = ai.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ai.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ai.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelectAI = (ai: AI) => {
    setActiveAI(ai);
  };

  const handleCloseModal = () => {
    setActiveAI(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-slate-900 to-purple-900/30 -z-10"></div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {filteredAIs.map(ai => (
            <AICard key={ai.id} ai={ai} onSelectAI={handleSelectAI} />
          ))}
        </div>

        {filteredAIs.length === 0 && (
            <div className="text-center py-20">
                <p className="text-2xl text-slate-400">No AIs found.</p>
                <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
            </div>
        )}
      </main>

      <footer className="text-center py-8 text-slate-500">
        <p>Built with ❤️ by <strong>Santanu</strong>, Senior React Engineer | Simulated interactions powered by <strong>Google Gemini</strong> | &copy; {new Date().getFullYear()} Santanu Pradhan. All rights reserved.</p>
      </footer>
      
      {activeAI && (
        <ChatModal 
          ai={activeAI}
          isOpen={!!activeAI}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
