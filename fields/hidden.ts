import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: unknown;
}

export default class Hidden extends Field {
  static defaults: Options = {};
  widget = "hidden";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Hidden.defaults);
  }

  /**
   * Accepts any valid data type.
   * Recommended for collections that allow adding new items
   */
  default(value: unknown): this {
    this.config.default = value;
    return this;
  }
}
