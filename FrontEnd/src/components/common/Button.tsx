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
  const baseStyles = "inline-flex items-center justify-center font-black rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 uppercase tracking-widest text-[11px]";

  // 2. Variants (Colors)
  const variants = {
    primary: "bg-[#5b52f1] text-white hover:bg-[#4a42d6] focus:ring-[#5b52f1]/20 shadow-xl shadow-[#5b52f1]/20 border border-white/10",
    secondary: "bg-white text-slate-700 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 focus:ring-slate-100 shadow-sm",
    danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500/20 shadow-xl shadow-rose-500/20 border border-white/10",
    ghost: "bg-transparent text-slate-500 hover:bg-[#5b52f1]/5 hover:text-[#5b52f1]",
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