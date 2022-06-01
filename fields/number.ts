import Field, { BaseOptions } from "./field.ts";

export type ValueType = "int" | "float";

export interface Options extends BaseOptions {
  default?: string | number;
  value_type?: ValueType;
  min?: number;
  max?: number;
  step?: number;
}

export default class Number extends Field<Options> {
  static defaults: Options = {};
  widget = "number";

  constructor(
    label: string,
    config: Options = structuredClone(Number.defaults),
  ) {
    super(label, config);
  }

  /** Accepts string or number value. Defaults to empty string */
  default(value: string | number): this {
    this.config.default = value;
    return this;
  }

  /** Accepts int or float. Any other value results in saving as a string */
  valueType(value: ValueType): this {
    this.config.value_type = value;
    return this;
  }

  /** Accepts a number for minimum value accepted */
  min(value: number): this {
    this.config.min = value;
    return this;
  }

  /** Accepts a number for maximum value accepted */
  max(value: number): this {
    this.config.max = value;
    return this;
  }

  /** Accepts a number for stepping up/down values in the input. */
  step(value: number): this {
    this.config.step = value;
    return this;
  }
}

export const defaults = new Number("Defaults", Number.defaults);
