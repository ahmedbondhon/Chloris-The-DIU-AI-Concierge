import React from 'react';
import { cn } from '../../lib/utils';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'neon-yellow' | 'neon-pink' | 'neon-blue';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary text-white border-primary hover:opacity-90 shadow-classic',
        secondary: 'bg-secondary text-[#1a0800] border-secondary hover:opacity-90 shadow-classic',
        outline: 'bg-transparent text-primary border-primary hover:bg-primary/5 shadow-classic outline-none',
        'neon-yellow': 'bg-primary text-white border-primary shadow-classic',
        'neon-pink': 'bg-primary text-white border-primary shadow-classic',
        'neon-blue': 'bg-primary text-white border-primary shadow-classic',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs rounded-lg',
        md: 'px-6 py-3 text-sm font-semibold rounded-xl',
        lg: 'px-8 py-4 text-base font-bold rounded-2xl',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center transition-all active:translate-x-[2px] active:translate-y-[2px] border-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading...</span>
                </div>
            ) : children}
        </button>
    );
};

export default RetroButton;
