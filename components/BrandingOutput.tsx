
import React from 'react';
import type { BrandIdentity, LogoConcept, ColorInfo, FontInfo, VoiceInfo } from '../types';
import { SparkleIcon } from './icons/SparkleIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { Tooltip } from './Tooltip';
import { Spinner } from './Spinner';

// Section Card Wrapper
const Section: React.FC<{ title: string; children: React.ReactNode; tooltipText?: string }> = ({ title, children, tooltipText }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-display text-navy">{title}</h3>
                {tooltipText && <Tooltip text={tooltipText} />}
            </div>
        </div>
        {children}
    </div>
);

// Logo Generation Section
const LogoGenerator: React.FC<{ concepts: LogoConcept[]; onGenerateLogo: (index: number) => void; }> = ({ concepts, onGenerateLogo }) => (
    <Section title="Logo Concepts" tooltipText="AI-generated logo ideas. Click 'Generate Image' to visualize a concept.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-navy">{concept.style}</h4>
                        <p className="text-gray-600 text-sm mt-2 mb-4">{concept.description}</p>
                    </div>
                    <div className="h-48 flex items-center justify-center bg-light-gray rounded-md mb-4">
                        {concept.isGenerating ? (
                            <div className="flex flex-col items-center text-navy">
                                <Spinner />
                                <p className="mt-2 text-sm">Drawing...</p>
                            </div>
                        ) : concept.imageUrl ? (
                            <img src={concept.imageUrl} alt={`${concept.style} logo`} className="max-h-full max-w-full object-contain" />
                        ) : (
                            <p className="text-gray-400 text-sm">Image will appear here</p>
                        )}
                    </div>
                    <button
                        onClick={() => onGenerateLogo(index)}
                        disabled={concept.isGenerating || !!concept.imageUrl}
                        className="w-full flex items-center justify-center px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <SparkleIcon className="w-4 h-4 mr-2" />
                        Generate Image
                    </button>
                </div>
            ))}
        </div>
    </Section>
);

// Color Palette Section
const ColorPaletteDisplay: React.FC<{ palette: BrandIdentity['colorPalette'] }> = ({ palette }) => {
    const ColorChip: React.FC<{ color: ColorInfo; name: string }> = ({ color, name }) => (
        <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: color.hex }}></div>
            <h5 className="mt-3 font-bold text-navy">{color.name} ({name})</h5>
            <p className="text-sm text-gray-500">{color.hex}</p>
            <Tooltip text={color.reason} />
        </div>
    );

    return (
        <Section title="Color Palette" tooltipText="A harmonious color scheme that reflects your brand's values.">
            <div className="flex flex-wrap justify-around items-start gap-8 py-4">
                <ColorChip color={palette.primary} name="Primary" />
                <ColorChip color={palette.secondary} name="Secondary" />
                <ColorChip color={palette.accent} name="Accent" />
            </div>
        </Section>
    );
};

// Typography Section
const TypographyDisplay: React.FC<{ typography: BrandIdentity['typography'] }> = ({ typography }) => (
    <Section title="Typography" tooltipText="Suggested font pairings for headings and body text to ensure readability and style.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4">
                <Tooltip text={typography.heading.reason} />
                <p className="text-xs text-gray-500 mb-1">HEADING FONT</p>
                <h4 className="text-2xl font-bold text-navy" style={{ fontFamily: `'${typography.heading.font}', sans-serif` }}>
                    {typography.heading.font}
                </h4>
                <p className="text-3xl mt-2" style={{ fontFamily: `'${typography.heading.font}', sans-serif` }}>
                    The quick brown fox jumps over the lazy dog.
                </p>
            </div>
            <div className="p-4">
                <Tooltip text={typography.body.reason} />
                <p className="text-xs text-gray-500 mb-1">BODY FONT</p>
                <h4 className="text-2xl font-bold text-navy" style={{ fontFamily: `'${typography.body.font}', sans-serif` }}>
                    {typography.body.font}
                </h4>
                <p className="mt-2 text-base" style={{ fontFamily: `'${typography.body.font}', sans-serif` }}>
                    The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
        </div>
    </Section>
);

// Brand Voice Section
const BrandVoiceDisplay: React.FC<{ voice: VoiceInfo[] }> = ({ voice }) => (
    <Section title="Brand Voice" tooltipText="Keywords that define your brand's communication style and personality.">
        <div className="flex justify-around items-center gap-4 py-4">
            {voice.map((v, i) => (
                <div key={i} className="text-center group">
                    <div className="bg-light-gray rounded-lg px-6 py-3">
                        <h5 className="text-lg font-bold text-teal">{v.adjective}</h5>
                    </div>
                    <div className="mt-2">
                        <Tooltip text={v.reason} />
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

// Brand Kit Download Section
const BrandKitDownloader: React.FC<{ brandIdentity: BrandIdentity }> = ({ brandIdentity }) => {
    const handleDownload = (content: string, fileName: string, contentType: string) => {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const generateMarkdown = () => {
        let md = `# ${brandIdentity.brandName} - Brand Guidelines\n\n`;
        md += `**Tagline:** ${brandIdentity.tagline}\n\n`;
        md += `## Color Palette\n`;
        md += `* **Primary (${brandIdentity.colorPalette.primary.name}):** ${brandIdentity.colorPalette.primary.hex}\n`;
        md += `* **Secondary (${brandIdentity.colorPalette.secondary.name}):** ${brandIdentity.colorPalette.secondary.hex}\n`;
        md += `* **Accent (${brandIdentity.colorPalette.accent.name}):** ${brandIdentity.colorPalette.accent.hex}\n\n`;
        md += `## Typography\n`;
        md += `* **Heading Font:** ${brandIdentity.typography.heading.font}\n`;
        md += `* **Body Font:** ${brandIdentity.typography.body.font}\n\n`;
        md += `## Brand Voice\n`;
        brandIdentity.brandVoice.forEach(v => {
            md += `* **${v.adjective}:** ${v.reason}\n`;
        });
        md += `\n## Logo Concepts\n`;
        brandIdentity.logoConcepts.forEach(l => {
            md += `* **${l.style}:** ${l.description}\n`;
        });
        return md;
    };

    const downloadMarkdown = () => {
        handleDownload(generateMarkdown(), 'brand_guidelines.md', 'text/markdown');
    };

    const downloadImage = async (url: string, name: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        handleDownload(blob as any, `${name.toLowerCase().replace(/\s/g, '_')}_logo.png`, 'image/png');
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in text-center">
            <h3 className="text-2xl font-bold font-display text-navy">Your Brand Blueprint is Ready!</h3>
            <p className="text-gray-600 mt-2 mb-6">Download your generated assets below.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={downloadMarkdown}
                    className="flex items-center justify-center px-6 py-3 bg-teal text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download Guidelines (.md)
                </button>
                {brandIdentity.logoConcepts.filter(c => c.imageUrl).map((concept, index) => (
                     <button
                        key={index}
                        onClick={() => downloadImage(concept.imageUrl!, concept.style)}
                        className="flex items-center justify-center px-6 py-3 bg-navy text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <DownloadIcon className="w-5 h-5 mr-2" />
                        Download {concept.style} Logo
                    </button>
                ))}
            </div>
        </div>
    );
};


interface BrandingOutputProps {
    brandIdentity: BrandIdentity;
    onGenerateLogo: (index: number) => void;
    onReset: () => void;
}

export const BrandingOutput: React.FC<BrandingOutputProps> = ({ brandIdentity, onGenerateLogo, onReset }) => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            <div className="text-center animate-fade-in">
                <h2 className="text-4xl font-display font-bold text-white">{brandIdentity.brandName}</h2>
                <p className="text-xl text-teal mt-2">"{brandIdentity.tagline}"</p>
            </div>

            <LogoGenerator concepts={brandIdentity.logoConcepts} onGenerateLogo={onGenerateLogo} />
            <ColorPaletteDisplay palette={brandIdentity.colorPalette} />
            <TypographyDisplay typography={brandIdentity.typography} />
            <BrandVoiceDisplay voice={brandIdentity.brandVoice} />
            <BrandKitDownloader brandIdentity={brandIdentity} />

            <div className="text-center pt-8">
                 <button onClick={onReset} className="px-8 py-3 bg-white text-navy font-bold rounded-lg shadow-md hover:bg-light-gray transform hover:-translate-y-1 transition-all duration-300">
                    Start a New Blueprint
                </button>
            </div>
        </div>
    );
};
