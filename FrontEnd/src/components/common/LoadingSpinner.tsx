import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean; // If true, covers the whole screen
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', fullScreen = false }) => {
  
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {size !== 'sm' && <p className="text-slate-500 text-sm font-medium">Loading...</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return <div className="flex justify-center p-4">{spinnerContent}</div>;
};

export default Spinner;