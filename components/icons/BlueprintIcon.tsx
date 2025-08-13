
import React from 'react';

export const BlueprintIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 12.5c0-5.32-4.14-9.5-9.5-9.5-5.33 0-9.5 4.15-9.5 9.5s4.17 9.5 9.5 9.5c5.36 0 9.5-4.18 9.5-9.5z" />
    <path d="M9 12a3 3 0 106 0 3 3 0 10-6 0z" />
    <path d="M12 22V19" />
    <path d="M12 5V2" />
    <path d="M5 12H2" />
    <path d="M22 12H19" />
    <path d="M19.07 4.93l-2.12 2.12" />
    <path d="M7.05 16.95l-2.12 2.12" />
    <path d="M19.07 19.07l-2.12-2.12" />
    <path d="M7.05 7.05l-2.12-2.12" />
  </svg>
);
