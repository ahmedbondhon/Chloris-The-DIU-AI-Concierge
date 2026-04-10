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
        primary: 'bg-[#5b52f1] text-white border-black shadow-retro-hard',
        secondary: 'bg-retro-pink text-white border-black shadow-retro-hard',
        outline: 'bg-white text-black border-2 border-black shadow-retro-hard',
        'neon-yellow': 'bg-retro-yellow text-black border-2 border-black shadow-retro-hard',
        'neon-pink': 'bg-retro-pink text-white border-2 border-black shadow-retro-hard',
        'neon-blue': 'bg-retro-blue text-black border-2 border-black shadow-retro-hard',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-6 py-2 text-base font-bold',
        lg: 'px-8 py-3 text-lg font-black',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-retro-hard-sm border-2',
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
