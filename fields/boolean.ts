import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: boolean;
}

export default class Boolean extends Field<Options> {
  static defaults: Options = {};
  widget = "boolean";

  constructor(
    label: string,
    config: Options = structuredClone(Boolean.defaults),
  ) {
    super(label, config);
  }

  /** Default value for the boolean field */
  default(defaultValue: boolean): this {
    this.config.default = defaultValue;
    return this;
  }
}

export const defaults = new Boolean("Defaults", Boolean.defaults);
