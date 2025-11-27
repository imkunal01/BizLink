import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id={checkboxId}
          className="peer sr-only"
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={`flex items-center justify-center w-5 h-5 border-2 border-neutral-300 rounded cursor-pointer transition-all duration-200
            peer-checked:bg-lime-400 peer-checked:border-lime-400
            peer-focus:ring-4 peer-focus:ring-lime-400/20
            hover:border-neutral-400 ${className}`}
        >
          <Check className="w-3 h-3 text-neutral-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
        </label>
      </div>
      {label && (
        <label htmlFor={checkboxId} className="ml-2 text-neutral-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}
