import Field, { BaseOptions } from "./field.ts";

export type Option = string | { label: string; value: string };
export interface Options extends BaseOptions {
  default?: Option;
  options: Option[];
  multiple?: boolean;
  min?: number;
  max?: number;
}

export default class Select extends Field<Options> {
  static defaults: Options = {
    options: [],
  };
  widget = "select";

  constructor(
    label: string,
    config: Options = structuredClone(Select.defaults),
  ) {
    super(label, config);
  }

  /**
   * Options must contain any default values
   * - String values: accepts a string; defaults to an empty string. Accepts an array of strings and defaults to an empty array with multiple: true enabled.
   * - Object with label and value fields: accepts an object with label and value field or an array of such objects when multiple: true is enable. Defaults to no value
   */
  default(value: string | Option): this {
    this.config.default = value;
    return this;
  }

  /**
   * There are two ways to list of options for the dropdown menu:
   * - String values: the dropdown displays the value directly
   * - Object with label and value fields: the label displays in the dropdown; the value saves in the file
   */
  options(value: Option[]): this {
    this.config.options = value;
    return this;
  }

  /** Defaults to false */
  multiple(value = true): this {
    this.config.multiple = value;
    return this;
  }

  /** Minimum number of items. Ignored if multiple is false */
  min(value: number): this {
    this.config.min = value;
    return this;
  }

  /** Maximum number of items. Ignored if multiple is false */
  max(value: number): this {
    this.config.max = value;
    return this;
  }
}

export const defaults = new Select("Defaults", Select.defaults);
