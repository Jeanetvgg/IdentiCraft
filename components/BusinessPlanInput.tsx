
import React from 'react';
import { SparkleIcon } from './icons/SparkleIcon';
import { Spinner } from './Spinner';

interface BusinessPlanInputProps {
  businessPlan: string;
  setBusinessPlan: (plan: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const examplePlan = `Business Name: VerdeTech\nIndustry: Sustainable Technology\nMission: To create innovative, eco-friendly consumer electronics that reduce electronic waste and promote a circular economy.\nTarget Audience: Environmentally conscious millennials and Gen Z, tech enthusiasts who value design and sustainability.\nKey Products: Modular smartphones and laptops designed for easy repair and upgrades, solar-powered chargers, and accessories made from recycled materials.\nBrand Values: Sustainability, Innovation, Transparency, Quality, and Community.`;

export const BusinessPlanInput: React.FC<BusinessPlanInputProps> = ({ businessPlan, setBusinessPlan, onGenerate, isLoading, error }) => {
  
  const handleUseExample = () => {
    setBusinessPlan(examplePlan);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl transition-all duration-500">
      <h2 className="text-2xl font-bold font-display text-navy mb-4">1. Enter Your Business Plan</h2>
      <p className="text-gray-600 mb-6">
        Provide the core details of your business. The more detail you provide, the better the AI can tailor your brand identity.
      </p>

      <textarea
        value={businessPlan}
        onChange={(e) => setBusinessPlan(e.target.value)}
        placeholder="Describe your business mission, vision, target audience, and values..."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal transition-shadow duration-300 resize-y"
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-between items-center">
         <button
          onClick={handleUseExample}
          className="text-sm text-teal hover:underline disabled:text-gray-400"
          disabled={isLoading}
        >
          Use Example Plan
        </button>
        <button
          onClick={onGenerate}
          className="flex items-center justify-center px-6 py-3 bg-teal text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading || !businessPlan.trim()}
        >
          {isLoading ? (
            <>
              <Spinner className="w-6 h-6 mr-3" />
              Building Blueprint...
            </>
          ) : (
            <>
              <SparkleIcon className="w-6 h-6 mr-2" />
              Generate Brand
            </>
          )}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};
