import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  // Generate a random ID if none provided (for accessibility)
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-black mb-2 px-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl text-sm transition-all text-black
          placeholder:text-slate-500 placeholder:font-medium
          focus:outline-none focus:ring-4 focus:ring-[#5b52f1]/10 focus:bg-white focus:border-[#5b52f1]
          ${error ? 'border-rose-200 focus:ring-rose-100' : 'border-slate-50'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs font-bold text-rose-500 px-1">{error}</p>
      )}
    </div>
  );
};

export default Input;