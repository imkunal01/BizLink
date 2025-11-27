import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: string;
  count?: number;
  gradient: string;
  onClick?: () => void;
}

export function CategoryCard({ name, icon, count, gradient, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative flex-shrink-0 w-32 h-40 rounded-2xl cursor-pointer overflow-hidden hover-lift"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${gradient}`} />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4 text-white">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-center">
          <p className="text-sm mb-1">{name}</p>
          {count && (
            <p className="text-xs opacity-80">{count}+ items</p>
          )}
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
