export interface BaseOptions {
  name?: string;
  required?: boolean;
  hint?: string;
  pattern?: [string, string][];
}

export default class Field<Options extends BaseOptions = BaseOptions> {
  widget = "";
  label: string;
  config: Options;

  constructor(label: string, config: Options) {
    this.label = label;
    this.config = config;
  }

  /** Get the current name */
  getName(): string {
    return this.config.name || this.label.toLowerCase().replaceAll(" ", "_");
  }

  /** Return the field as JSON */
  // deno-lint-ignore no-explicit-any
  toJSON(): Record<string, any> {
    return {
      label: this.label,
      name: this.getName(),
      widget: this.widget,
      ...this.config,
    };
  }

  /** Makes the field mandatory. */
  required(required = true): this {
    this.config.required = required;
    return this;
  }

  /** Change the field name */
  name(name: string): this {
    this.config.name = name;
    return this;
  }

  /**
   * Optionally add helper text directly below a widget.
   * Useful for including instructions.
   * Accepts markdown for bold, italic, strikethrough, and links.
   */
  hint(hint: string): this {
    this.config.hint = hint;
    return this;
  }

  /** Add field validation by specifying a list with a regex pattern and an error message. */
  pattern(pattern: string, error: string): this {
    const patterns = this.config.pattern || [];
    patterns.push([pattern, error]);
    this.config.pattern = patterns;
    return this;
  }
}
