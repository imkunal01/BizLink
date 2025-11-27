import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block mb-2 text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl transition-all duration-200 resize-none
          focus:border-lime-400 focus:ring-4 focus:ring-lime-400/20 focus:outline-none
          hover:border-neutral-300
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}
