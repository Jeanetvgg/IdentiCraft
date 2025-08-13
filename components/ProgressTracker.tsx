
import React from 'react';

interface ProgressTrackerProps {
  steps: string[];
  currentStepIndex: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStepIndex
                    ? 'bg-teal text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {index < currentStepIndex ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </div>
              <p className={`mt-2 text-xs sm:text-sm text-center font-semibold transition-colors duration-300 ${index <= currentStepIndex ? 'text-white' : 'text-gray-400'}`}>{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto border-t-2 transition-colors duration-300 mx-2 ${
                index < currentStepIndex ? 'border-teal' : 'border-gray-300 dark:border-gray-600'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
