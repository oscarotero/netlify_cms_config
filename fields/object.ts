import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: Record<string, unknown>;
  collapsed?: boolean;
  summary?: string;
  fields: Field[];
}

export default class Object extends Field {
  static defaults: Options = {
    fields: [],
  };
  widget = "object";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Object.defaults);
  }

  /** You can set defaults within each sub-field's configuration */
  default(value: Record<string, unknown>): this {
    this.config.default = value;
    return this;
  }

  /** If added and labeled true, collapse the widget's content by default */
  collapsed(value = true): this {
    this.config.collapsed = value;
    return this;
  }

  /** Specify the label displayed when the object is collapsed */
  summary(value: string): this {
    this.config.summary = value;
    return this;
  }

  /** A nested list of widget fields to include in your widget */
  fields(value: Field[]): this {
    this.config.fields = value;
    return this;
  }

  /** Return the field as JSON */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();

    // Set fields to the end of the JSON object
    delete json.fields;
    json.fields = this.config.fields?.map((field) => field.toJSON());
    return json;
  }
}
