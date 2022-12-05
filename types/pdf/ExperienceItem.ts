
export class ExperienceItem {
  content: any;
  visible? = true;

  constructor(content: any, options?: { visible?: boolean }) {
    this.content = content;
    if (options) {
      if (options.visible !== undefined) this.visible = options.visible;
    }
  }
};