import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: unknown;
}

export default class Hidden extends Field<Options> {
  static defaults: Options = {};
  widget = "hidden";

  constructor(
    label: string,
    config: Options = structuredClone(Hidden.defaults),
  ) {
    super(label, config);
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

export const defaults = new Hidden("Defaults", Hidden.defaults);
