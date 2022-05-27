import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: string[] | Record<string, unknown>[];
  allow_add?: boolean;
  collapsed?: boolean;
  summary?: string;
  minimize_collapsed?: boolean;
  label_singular?: string;
  field?: Field;
  fields?: Field[];
  max?: number;
  min?: number;
  add_to_top?: boolean;
}

export default class List extends Field {
  static defaults: Options = {};
  widget = "list";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(List.defaults);
  }

  /**
   * You may specify a list of strings to populate the basic text field,
   * or an array of list items for lists using the fields option.
   * If no default is declared when using field or fields, will default to a single list item using the defaults on the child widgets
   */
  default(value: string[] | Record<string, unknown>[]): this {
    this.config.default = value;
    return this;
  }

  /** False hides the button to add additional items */
  allowAdd(value = true): this {
    this.config.allow_add = value;
    return this;
  }

  /** When true, the entries collapse by default */
  collapsed(value = true): this {
    this.config.collapsed = value;
    return this;
  }

  /** Specify the label displayed on collapsed entries */
  summary(value: string): this {
    this.config.summary = value;
    return this;
  }

  /** When true, collapsing the list widget will hide all of it's entries instead of showing summaries */
  minimizeCollapsed(value = true): this {
    this.config.minimize_collapsed = value;
    return this;
  }

  /** The text to show on the add button */
  labelSingular(value: string): this {
    this.config.label_singular = value;
    return this;
  }

  /** A single widget field to be repeated */
  fields(value: Field | Field[]): this {
    if (Array.isArray(value)) {
      this.config.fields = value;
    } else {
      this.config.field = value;
    }
    return this;
  }

  /** Maximum number of items in the list */
  max(value: number): this {
    this.config.max = value;
    return this;
  }

  /** Minimum number of items in the list */
  min(value: number): this {
    this.config.min = value;
    return this;
  }

  /** When true, new entries will be added to the top of the list */
  addToTop(value = true): this {
    this.config.add_to_top = value;
    return this;
  }

  /** Return the field as JSON */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();

    // Set field(s) to the end of the JSON object
    if (this.config.fields) {
      delete json.fields;
      json.fields = this.config.fields?.map((field) => field.toJSON());
    } else if (this.config.field) {
      delete json.field;
      json.field = this.config.field.toJSON();
    }

    return json;
  }
}
