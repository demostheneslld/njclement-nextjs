export class ExperienceItem {
  content: string;
  visible? = true;

  constructor(content: string, options?: { visible?: boolean }) {
    this.content = content;
    if (options) {
      if (options.visible !== undefined) this.visible = options.visible;
    }
  }
};