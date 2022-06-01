import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: string;
}

export default class Text extends Field<Options> {
  static defaults: Options = {};
  widget = "text";

  constructor(label: string, config: Options = structuredClone(Text.defaults)) {
    super(label, config);
  }

  /** Defaults to an empty string */
  default(value: string): this {
    this.config.default = value;
    return this;
  }
}

export const defaults = new Text("Defaults", Text.defaults);
