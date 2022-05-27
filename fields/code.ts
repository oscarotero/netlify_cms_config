import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default_language?: string;
  allow_language_selection?: boolean;
  keys?: {
    code: string;
    lang: string;
  };
  output_code_only?: boolean;
}

export default class Code extends Field {
  static defaults: Options = {};
  widget = "code";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Code.defaults);
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
