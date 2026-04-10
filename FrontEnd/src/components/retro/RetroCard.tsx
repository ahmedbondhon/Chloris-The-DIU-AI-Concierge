import React from 'react';
import { cn } from '../../lib/utils';

interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'neon-yellow' | 'neon-pink' | 'neon-blue' | 'glass';
}

const RetroCard: React.FC<RetroCardProps> = ({
    className,
    variant = 'primary',
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-white text-black border-black',
        secondary: 'bg-retro-light text-black border-black',
        glass: 'bg-white/80 backdrop-blur-md text-black border-black',
        'neon-yellow': 'bg-retro-yellow text-black border-black',
        'neon-pink': 'bg-retro-pink text-white border-black',
        'neon-blue': 'bg-retro-blue text-black border-black',
    };

    return (
        <div
            className={cn(
                'border-4 p-6 shadow-retro-hard transition-all',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default RetroCard;
