import React from 'react';
import { Leaf, History as HistoryIcon, Info } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-leaf-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-leaf-500 p-1.5 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-leaf-900 tracking-tight">PlantGuard AI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#diagnose" className="text-sm font-medium text-leaf-700 hover:text-leaf-900 transition-colors">Diagnose</a>
            <a href="#history" className="text-sm font-medium text-leaf-700 hover:text-leaf-900 transition-colors">History</a>
            <a href="#about" className="text-sm font-medium text-leaf-700 hover:text-leaf-900 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-leaf-500 hover:bg-leaf-50 rounded-full transition-colors">
              <HistoryIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-leaf-500 hover:bg-leaf-50 rounded-full transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
