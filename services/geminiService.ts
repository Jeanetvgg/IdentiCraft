
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { BrandIdentity } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    brandName: { type: Type.STRING, description: "A creative and relevant name for the business." },
    tagline: { type: Type.STRING, description: "A short, memorable slogan." },
    logoConcepts: {
      type: Type.ARRAY,
      description: "A list of three distinct logo concepts.",
      items: {
        type: Type.OBJECT,
        properties: {
          style: { type: Type.STRING, description: "The style of the logo (e.g., Minimalist, Abstract, Emblem)." },
          description: { type: Type.STRING, description: "A detailed visual description of the logo concept. Describe shapes, elements, and how they relate to the business, to be used as a prompt for an image generator." }
        },
        required: ["style", "description"]
      }
    },
    colorPalette: {
      type: Type.OBJECT,
      properties: {
        primary: { 
            type: Type.OBJECT, 
            properties: {
                hex: { type: Type.STRING, description: "Hex code for the primary color." },
                name: { type: Type.STRING, description: "Name of the color." },
                reason: { type: Type.STRING, description: "Reason for choosing this color based on color psychology." }
            },
            required: ["hex", "name", "reason"]
        },
        secondary: { 
            type: Type.OBJECT, 
            properties: {
                hex: { type: Type.STRING, description: "Hex code for the secondary color." },
                name: { type: Type.STRING, description: "Name of the color." },
                reason: { type: Type.STRING, description: "Reason for choosing this color." }
            },
            required: ["hex", "name", "reason"]
        },
        accent: { 
            type: Type.OBJECT, 
            properties: {
                hex: { type: Type.STRING, description: "Hex code for the accent color." },
                name: { type: Type.STRING, description: "Name of the color." },
                reason: { type: Type.STRING, description: "Reason for choosing this color." }
            },
            required: ["hex", "name", "reason"]
        },
      },
      required: ["primary", "secondary", "accent"]
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        heading: { 
            type: Type.OBJECT,
            properties: {
                font: { type: Type.STRING, description: "Font name for headings (e.g., Poppins, Montserrat)." },
                reason: { type: Type.STRING, description: "Reason for choosing this modern, bold sans-serif font." }
            },
            required: ["font", "reason"]
        },
        body: { 
            type: Type.OBJECT,
            properties: {
                font: { type: Type.STRING, description: "Font name for body text (e.g., Open Sans, Lato)." },
                reason: { type: Type.STRING, description: "Reason for choosing this readable sans-serif font." }
            },
            required: ["font", "reason"]
        }
      },
      required: ["heading", "body"]
    },
    brandVoice: {
      type: Type.ARRAY,
      description: "A list of three adjectives describing the brand's voice.",
      items: {
        type: Type.OBJECT,
        properties: {
          adjective: { type: Type.STRING, description: "An adjective that fits the brand voice." },
          reason: { type: Type.STRING, description: "Why this adjective fits the brand voice." }
        },
        required: ["adjective", "reason"]
      }
    }
  },
  required: ["brandName", "tagline", "logoConcepts", "colorPalette", "typography", "brandVoice"]
};

export const generateBrandIdentity = async (businessPlan: string): Promise<BrandIdentity> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert branding and marketing consultant. A user has provided their business plan. Based on this plan, generate a complete brand identity. Business Plan: "${businessPlan}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: brandIdentitySchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as BrandIdentity;
    } catch (error) {
        console.error("Error generating brand identity:", error);
        throw new Error("Failed to generate brand identity from the business plan.");
    }
};

export const generateLogoImage = async (description: string): Promise<string> => {
    try {
        const fullPrompt = `A clean, modern, vector-style logo of ${description}. The logo should be on a plain white background, high resolution, suitable for a corporate brand identity.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: fullPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error("Error generating logo image:", error);
        throw new Error("Failed to generate logo image.");
    }
};
