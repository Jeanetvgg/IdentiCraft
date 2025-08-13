
import React from 'react';

export const Spinner: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <div
    className={`${className} animate-spin rounded-full border-4 border-t-teal border-r-teal border-b-navy border-l-navy`}
  ></div>
);
