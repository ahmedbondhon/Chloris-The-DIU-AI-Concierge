import React from 'react';
import { cn } from '../../lib/utils';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'neon-yellow' | 'neon-pink' | 'neon-blue';
    size?: 'sm' | 'md' | 'lg';
}

const RetroButton: React.FC<RetroButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-white text-black border-white hover:bg-white/90 shadow-classic',
        secondary: 'bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-classic',
        outline: 'bg-transparent text-white border-white/20 hover:bg-white/5 shadow-classic',
        'neon-yellow': 'bg-white text-black border-white hover:bg-white/90 shadow-classic',
        'neon-pink': 'bg-white text-black border-white hover:bg-white/90 shadow-classic',
        'neon-blue': 'bg-white text-black border-white hover:bg-white/90 shadow-classic',
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-sm rounded-lg',
        md: 'px-6 py-2.5 text-base font-semibold rounded-xl',
        lg: 'px-8 py-4 text-lg font-bold rounded-2xl',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center transition-all active:scale-[0.98] border',
                variants[variant],
                sizes[size],
                className
            )}

            {...props}
        >
            {children}
        </button>
    );
};

export default RetroButton;
