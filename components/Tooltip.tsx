
import React from 'react';
import { InfoIcon } from './icons/InfoIcon';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="group relative flex items-center">
      {children || <InfoIcon className="w-4 h-4 text-gray-400 cursor-pointer" />}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        {text}
      </span>
    </div>
  );
};
