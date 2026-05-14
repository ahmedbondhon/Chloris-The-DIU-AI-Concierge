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
        <label htmlFor={inputId} className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3.5 bg-surface border-border border rounded-xl text-sm transition-all text-text-primary
          placeholder:text-text-muted/50 placeholder:font-medium
          focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-surface focus:border-primary

          ${error ? 'border-rose-500 focus:ring-rose-500/10' : 'border-border'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-[10px] font-semibold text-rose-500 px-1 uppercase tracking-widest">{error}</p>
      )}
    </div>
  );
};

export default Input;