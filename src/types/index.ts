export type Category = 'battle' | 'dance' | 'comedy' | 'trending';

export type CreationMode = 'prompt' | 'template';

export type Duration = '5s' | '10s';

export type VideoStyle = 'cinematic' | 'anime' | 'pixel' | 'ink' | 'cartoon';

export type VideoFormat = '9:16' | '16:9' | '1:1';

export interface Template {
  id: string;
  name: string;
  category: Category;
  thumbnail: string;
  description: string;
  prompt: string;
  creditCost: { '5s_720p': number; '5s_1080p': number; '10s_720p': number; '10s_1080p': number };
  gradient: string;
  popular?: boolean;
}

export interface PromptSuggestion {
  id: string;
  category: string;
  textKo: string;
}

export interface GalleryItem {
  id: string;
  templateId?: string;
  thumbnail?: string;
  title: string;
  views: number;
  likes: number;
  createdAt: string;
  prompt?: string;
  creationMode: CreationMode;
}
