import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-teal-500 flex items-center justify-center shadow-lg">
        <span className="text-white">KC</span>
      </div>
      <div className="flex flex-col">
        <span className="tracking-tight">Kripa Connect</span>
        <span className="text-[10px] text-muted-foreground -mt-1">Electronics & More</span>
      </div>
    </div>
  );
}
