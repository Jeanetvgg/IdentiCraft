
import React from 'react';
import { BlueprintIcon } from './icons/BlueprintIcon';

export const Header: React.FC = () => {
  return (
    <header className="p-6 text-white flex items-center justify-center space-x-4">
      <BlueprintIcon className="w-10 h-10 text-teal" />
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold">Modern Blueprint</h1>
        <p className="text-sm sm:text-base text-gray-300">AI-Powered Brand Identity Generator</p>
      </div>
    </header>
  );
};
