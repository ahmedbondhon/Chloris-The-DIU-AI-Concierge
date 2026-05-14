import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
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
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] tracking-tight";

  // 2. Variants (Colors)
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 focus:ring-primary/20 shadow-classic shadow-primary/20",
    secondary: "bg-secondary text-[#1a0800] hover:opacity-90 focus:ring-secondary/20 shadow-classic",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/20 shadow-classic",
    ghost: "bg-transparent text-text-muted hover:bg-surface hover:text-text-primary",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary/5",
  };
  // 3. Sizes
  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-10 py-5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant as keyof typeof variants] || variants.primary} ${sizes[size]} ${className} font-sora`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;