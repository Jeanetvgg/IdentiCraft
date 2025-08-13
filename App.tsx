
import React, { useState, useCallback, useMemo } from 'react';
import type { BrandIdentity } from './types';
import { Header } from './components/Header';
import { BusinessPlanInput } from './components/BusinessPlanInput';
import { BrandingOutput } from './components/BrandingOutput';
import { ProgressTracker } from './components/ProgressTracker';
import { MiniGameModal } from './components/MiniGameModal';
import { generateBrandIdentity, generateLogoImage } from './services/geminiService';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
    const [businessPlan, setBusinessPlan] = useState<string>('');
    const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isGameOpen, setIsGameOpen] = useState<boolean>(false);
    
    const steps = ['Plan', 'Brand', 'Logo', 'Colors', 'Fonts', 'Voice', 'Kit'];
    const currentStepIndex = useMemo(() => {
        if (error) return 0;
        if (isLoading) return 1;
        if (brandIdentity) return steps.length;
        return 0;
    }, [brandIdentity, isLoading, error, steps.length]);

    const handleGenerateBrand = useCallback(async () => {
        if (!businessPlan.trim()) {
            setError('Business plan cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setBrandIdentity(null);

        try {
            const identity = await generateBrandIdentity(businessPlan);
            setBrandIdentity(identity);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            setBrandIdentity(null);
        } finally {
            setIsLoading(false);
        }
    }, [businessPlan]);

    const handleGenerateLogo = useCallback(async (logoIndex: number) => {
        if (!brandIdentity) return;
        
        const updatedConcepts = [...brandIdentity.logoConcepts];
        updatedConcepts[logoIndex].isGenerating = true;
        setBrandIdentity({ ...brandIdentity, logoConcepts: updatedConcepts });

        try {
            const description = brandIdentity.logoConcepts[logoIndex].description;
            const imageUrl = await generateLogoImage(description);
            
            const finalConcepts = [...brandIdentity.logoConcepts];
            finalConcepts[logoIndex].isGenerating = false;
            finalConcepts[logoIndex].imageUrl = imageUrl;
            setBrandIdentity({ ...brandIdentity, logoConcepts: finalConcepts });
        } catch (e) {
            setError("Failed to generate logo. Please try again.");
            const finalConcepts = [...brandIdentity.logoConcepts];
            finalConcepts[logoIndex].isGenerating = false;
            setBrandIdentity({ ...brandIdentity, logoConcepts: finalConcepts });
        }
    }, [brandIdentity]);
    
    const handleReset = () => {
        setBusinessPlan('');
        setBrandIdentity(null);
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-navy text-white flex flex-col items-center py-8 px-4">
            <Header />
            <div className="w-full max-w-5xl my-8">
                <ProgressTracker steps={steps} currentStepIndex={currentStepIndex} />
            </div>

            <main className="w-full flex-grow flex flex-col items-center justify-center">
                {!brandIdentity && !isLoading && (
                    <BusinessPlanInput
                        businessPlan={businessPlan}
                        setBusinessPlan={setBusinessPlan}
                        onGenerate={handleGenerateBrand}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
                {isLoading && (
                     <div className="flex flex-col items-center text-center p-8 bg-white/10 rounded-xl">
                        <Spinner className="w-16 h-16"/>
                        <p className="mt-4 text-xl font-semibold text-teal font-display">Building Your Blueprint...</p>
                        <p className="mt-2 text-gray-300">This can take a moment. The AI is crafting your unique brand.</p>
                    </div>
                )}
                {brandIdentity && !isLoading && (
                    <BrandingOutput 
                        brandIdentity={brandIdentity} 
                        onGenerateLogo={handleGenerateLogo}
                        onReset={handleReset}
                    />
                )}
            </main>
            
            <footer className="w-full text-center py-8 mt-auto">
                <button
                    onClick={() => setIsGameOpen(true)}
                    className="px-6 py-2 bg-teal text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
                >
                    Test Your Branding Knowledge!
                </button>
            </footer>

            <MiniGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
        </div>
    );
};

export default App;
