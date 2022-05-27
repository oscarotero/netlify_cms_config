import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: string;
}

export default class String extends Field {
  static defaults: Options = {};
  widget = "string";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(String.defaults);
  }

  /** Defaults to an empty string */
  default(value: string): this {
    this.config.default = value;
    return this;
  }
}
