import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: string;
}

export default class Text extends Field {
  static defaults: Options = {};
  widget = "text";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Text.defaults);
  }

  /** Defaults to an empty string */
  default(value: string): this {
    this.config.default = value;
    return this;
  }
}
