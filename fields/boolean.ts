import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: boolean;
}

export default class Boolean extends Field {
  static defaults: Options = {};
  widget = "boolean";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Boolean.defaults);
  }

  /** Default value for the boolean field */
  default(defaultValue: boolean): this {
    this.config.default = defaultValue;
    return this;
  }
}
