import { ContentRendererTypes } from "@/config/pdf-setup";
import { ExperienceItem } from "./ExperienceItem";
import { SpacerContent } from "./Spacer";



export type ContentItemConfig = TitleConfig | ExperienceConfig| SectionConfig | SpacerConfig;
export type ContentItemContent = TitleContent | ExperienceContent | SectionContent | SpacerContent;

export interface TitleContent {
  name: string;
  email: string;
  website: string;
  address?: string;
  phone: string;
  summary: string;
}
interface TitleConfig {
  content: TitleContent;
  rendererKey: ContentRendererTypes.TITLE;
}

export interface ExperienceContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  dateRange?: string;
  items?: ExperienceItem[];
}
interface ExperienceConfig {
  content: ExperienceContent;
  rendererKey: ContentRendererTypes.EXPERIENCE;
};

export interface SectionContent {
  title: string;
}
interface SectionConfig {
  content: SectionContent;
  rendererKey: ContentRendererTypes.SECTION;
}

interface SpacerConfig {
  content: SpacerContent;
  rendererKey: ContentRendererTypes.SPACER;
}

export class ContentItem {
  content: ContentItemContent;
  rendererKey: ContentRendererTypes;
  isVisible? = true;
  
  constructor(config: ContentItemConfig, options?: { visible?: boolean }) {
    this.content = config.content;
    this.rendererKey = config.rendererKey;
    if (options) {
      if (options.visible !== undefined) this.isVisible = options.visible;
    }
  }
};