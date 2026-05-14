import React from 'react';
import { cn } from '../../lib/utils';

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const RetroInput: React.FC<RetroInputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                'w-full bg-surface border border-border rounded-xl p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary shadow-sm transition-all placeholder:text-text-muted/30',
                className
            )}
            {...props}
        />
    );
};

export default RetroInput;
