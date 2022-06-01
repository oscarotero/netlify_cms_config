import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: string;
  allowInput?: boolean;
  enableAlpha?: boolean;
}

export default class Color extends Field<Options> {
  static defaults: Options = {};
  widget = "color";

  constructor(
    label: string,
    config: Options = structuredClone(Color.defaults),
  ) {
    super(label, config);
  }

  /** Sets the default value. Defaults to an empty string. */
  default(color: string): this {
    this.config.default = color;
    return this;
  }

  /** Allows manual editing of the color input value */
  allowInput(allowInput = true): this {
    this.config.allowInput = allowInput;
    return this;
  }

  /** Enables Alpha editing */
  enableAlpha(enableAlpha = true): this {
    this.config.enableAlpha = enableAlpha;
    return this;
  }
}

export const defaults = new Color("Defaults", Color.defaults);
