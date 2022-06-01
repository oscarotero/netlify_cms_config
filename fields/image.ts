import File, { Options as BaseOptions } from "./file.ts";

export type Options = BaseOptions;

export default class Image extends File {
  static defaults: Options = {};
  widget = "image";

  constructor(label: string, config: Options = structuredClone(File.defaults)) {
    super(label, config);
  }
}

export const defaults = new Image("Defaults", Image.defaults);
