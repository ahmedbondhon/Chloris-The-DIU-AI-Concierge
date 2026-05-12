import React from 'react';
import { cn } from '../../lib/utils';

interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'neon-yellow' | 'neon-pink' | 'neon-blue' | 'glass' | 'modern-3d';
}

const RetroCard: React.FC<RetroCardProps> = ({
    className,
    variant = 'primary',
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-surface text-text-primary border-border shadow-classic-lg',
        secondary: 'bg-surface/50 text-text-primary border-border',
        glass: 'bg-surface/40 backdrop-blur-xl text-text-primary border-border',
        'modern-3d': 'bg-[#111113] text-text-primary border-white/5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.5),0_8px_10px_-6px_rgba(0,0,0,0.5)]',
        'neon-yellow': 'bg-surface text-text-primary border-border',
        'neon-pink': 'bg-surface text-text-primary border-border',
        'neon-blue': 'bg-surface text-text-primary border-border',
    };

    return (
        <div
            className={cn(
                'border p-6 transition-all',
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
