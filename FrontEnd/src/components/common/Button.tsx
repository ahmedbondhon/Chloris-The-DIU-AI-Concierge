import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {

  // 1. Base Styles (applies to all buttons)
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] tracking-tight";

  // 2. Variants (Colors)
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary/20 shadow-classic shadow-primary/20",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus:ring-slate-100 shadow-classic",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/20 shadow-classic shadow-rose-500/20",
    ghost: "bg-transparent text-slate-600 hover:bg-primary/5 hover:text-primary",
  };

  // 3. Sizes
  const sizes = {
    sm: "px-4 py-2.5",
    md: "px-6 py-3.5",
    lg: "px-10 py-5 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} font-outfit`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;