import File, { Options as FileOptions } from "./file.ts";

export type Options = FileOptions;

export default class Image extends File {
  static defaults: Options = {};
  widget = "image";
  config: Options = {};

  constructor(label: string) {
    super(label);
    this.config = structuredClone(File.defaults);
  }
}
