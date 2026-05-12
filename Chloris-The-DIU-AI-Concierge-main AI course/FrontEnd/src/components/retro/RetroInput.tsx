import React from 'react';
import { cn } from '../../lib/utils';

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const RetroInput: React.FC<RetroInputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                'w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-white/5 focus:border-white shadow-sm transition-all placeholder:text-white/20',
                className
            )}

            {...props}
        />
    );
};

export default RetroInput;
