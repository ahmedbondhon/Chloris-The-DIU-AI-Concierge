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
        primary: 'bg-white/5 text-white border-white/10 shadow-classic-lg',
        secondary: 'bg-white/10 text-white border-white/20',
        glass: 'bg-white/5 backdrop-blur-xl text-white border-white/10',
        'neon-yellow': 'bg-white/5 text-white border-white/10',
        'neon-pink': 'bg-white/5 text-white border-white/10',
        'neon-blue': 'bg-white/5 text-white border-white/10',
    };

    return (
        <div
            className={cn(
                'rounded-2xl border p-6 shadow-classic transition-all duration-300',
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
