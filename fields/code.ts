import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default_language?: string;
  allow_language_selection?: boolean;
  keys?: {
    code: string;
    lang: string;
  };
  output_code_only?: boolean;
}

export default class Code extends Field<Options> {
  static defaults: Options = {};
  widget = "code";

  constructor(label: string, config: Options = structuredClone(Code.defaults)) {
    super(label, config);
  }

  /** Default language to use */
  defaultLanguage(language: string): this {
    this.config.default_language = language;
    return this;
  }

  /** Allows syntax to be changed */
  allowLanguageSelection(allow = true): this {
    this.config.allow_language_selection = allow;
    return this;
  }

  /**
   * Sets key names for code and lang if outputting an object.
   * Defaults to { code: 'code', lang: 'lang' }
   */
  keys(keys: { code: string; lang: string }): this {
    this.config.keys = keys;
    return this;
  }

  /** Set to true to output the string value only. */
  outputCodeOnly(output = true): this {
    this.config.output_code_only = output;
    return this;
  }
}

export const defaults = new Code("Defaults", Code.defaults);
