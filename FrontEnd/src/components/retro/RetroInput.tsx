import React from 'react';
import { cn } from '../../lib/utils';

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const RetroInput: React.FC<RetroInputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                'w-full bg-white border-2 border-black p-3 text-black font-bold shadow-retro-hard-sm focus:outline-none focus:shadow-retro-hard transition-all placeholder:text-slate-400',
                className
            )}
            {...props}
        />
    );
};

export default RetroInput;
