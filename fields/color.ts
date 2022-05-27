import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: string;
  allowInput?: boolean;
  enableAlpha?: boolean;
}

export default class Color extends Field {
  static defaults: Options = {};
  widget = "color";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Color.defaults);
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
