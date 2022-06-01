import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: string;
}

export default class String extends Field<Options> {
  static defaults: Options = {};
  widget = "string";

  constructor(
    label: string,
    config: Options = structuredClone(String.defaults),
  ) {
    super(label, config);
  }

  /** Defaults to an empty string */
  default(value: string): this {
    this.config.default = value;
    return this;
  }
}

export const defaults = new String("Defaults", String.defaults);
