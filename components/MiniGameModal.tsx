
import React, { useState, useMemo, useEffect } from 'react';
import { GameStatus } from '../types';

interface MiniGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorPuzzles = [
  { color: '#FF4136', name: 'Red', emotion: 'Energy', options: ['Calm', 'Energy', 'Sadness'] },
  { color: '#0074D9', name: 'Blue', emotion: 'Trust', options: ['Trust', 'Anger', 'Jealousy'] },
  { color: '#2ECC40', name: 'Green', emotion: 'Growth', options: ['Danger', 'Luxury', 'Growth'] },
  { color: '#FFDC00', name: 'Yellow', emotion: 'Optimism', options: ['Optimism', 'Fear', 'Formality'] },
  { color: '#B10DC9', name: 'Purple', emotion: 'Creativity', options: ['Boredom', 'Creativity', 'Nature'] },
];

export const MiniGameModal: React.FC<MiniGameModalProps> = ({ isOpen, onClose }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>(GameStatus.Playing);
  const [score, setScore] = useState(0);

  const currentPuzzle = useMemo(() => colorPuzzles[currentPuzzleIndex], [currentPuzzleIndex]);
  
  useEffect(() => {
    if (isOpen) {
        setCurrentPuzzleIndex(0);
        setScore(0);
        setStatus(GameStatus.Playing);
    }
  }, [isOpen]);

  const handleAnswer = (option: string) => {
    if (status !== GameStatus.Playing) return;

    if (option === currentPuzzle.emotion) {
      setStatus(GameStatus.Correct);
      setScore(s => s + 1);
    } else {
      setStatus(GameStatus.Incorrect);
    }

    setTimeout(() => {
      if (currentPuzzleIndex < colorPuzzles.length - 1) {
        setCurrentPuzzleIndex(i => i + 1);
        setStatus(GameStatus.Playing);
      } else {
        // End of game
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md m-4 text-center transform transition-transform duration-300 scale-95 hover:scale-100" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold font-display text-navy mb-2">Color Theory Challenge!</h2>
        <p className="text-gray-600 mb-6">Match the color to the emotion it most commonly represents in branding.</p>

        <div className="mb-6">
            <div className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" style={{ backgroundColor: currentPuzzle.color }}></div>
            <p className="text-lg font-semibold text-gray-700">Which emotion does this color evoke?</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentPuzzle.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={status !== GameStatus.Playing}
              className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:-translate-y-1
                ${status === GameStatus.Playing && 'bg-navy hover:bg-opacity-90'}
                ${status === GameStatus.Correct && option === currentPuzzle.emotion && 'bg-green-500'}
                ${status === GameStatus.Incorrect && option === currentPuzzle.emotion && 'bg-green-500'}
                ${status === GameStatus.Incorrect && option !== currentPuzzle.emotion && 'bg-red-500'}
                ${status !== GameStatus.Playing && option !== currentPuzzle.emotion && 'bg-gray-400'}
              `}
            >
              {option}
            </button>
          ))}
        </div>
        
        {currentPuzzleIndex === colorPuzzles.length - 1 && status !== GameStatus.Playing && (
            <div className="mt-6 animate-fade-in">
                <p className="text-xl font-bold text-navy">Game Over!</p>
                <p className="text-gray-700">You scored {score} out of {colorPuzzles.length}!</p>
                <button onClick={onClose} className="mt-4 px-6 py-2 bg-teal text-white font-bold rounded-lg shadow-md hover:bg-opacity-90">Close</button>
            </div>
        )}

      </div>
    </div>
  );
};
