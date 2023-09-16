export enum FileExtension {
  PDF = "pdf",
}

export class FileName {
  constructor (private name: string, private extension: FileExtension) {}

  public toString() {
    return `${this.name}.${this.extension}`;
  }
}