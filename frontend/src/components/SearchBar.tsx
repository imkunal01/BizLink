import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search for products, brands and more...", 
  onSearch,
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-teal-400 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="relative flex items-center bg-white rounded-full px-6 py-4 shadow-lg border border-gray-100 group-hover:border-lime-400 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 mx-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="button"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-lime-400 to-teal-400 flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </form>
  );
}
