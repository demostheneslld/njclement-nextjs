import { ContentRendererTypes } from "../../config/pdfSetup";

export class ContentItem {
  content: any;
  rendererKey: ContentRendererTypes;
  isVisible? = true;
  isCollapsed = true;
  
  constructor(rendererKey: ContentRendererTypes, content: any, options?: { visible?: boolean }) {
    this.content = content;
    this.rendererKey = rendererKey;
    if (options) {
      if (options.visible !== undefined) this.isVisible = options.visible;
    }
  }
};