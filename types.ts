
export interface LogoConcept {
  style: string;
  description: string;
  imageUrl?: string;
  isGenerating?: boolean;
}

export interface ColorInfo {
  hex: string;
  name: string;
  reason: string;
}

export interface FontInfo {
  font: string;
  reason: string;
}

export interface VoiceInfo {
  adjective: string;
  reason: string;
}

export interface BrandIdentity {
  brandName: string;
  tagline: string;
  logoConcepts: LogoConcept[];
  colorPalette: {
    primary: ColorInfo;
    secondary: ColorInfo;
    accent: ColorInfo;
  };
  typography: {
    heading: FontInfo;
    body: FontInfo;
  };
  brandVoice: VoiceInfo[];
}

export enum GameStatus {
  Playing,
  Correct,
  Incorrect
}
