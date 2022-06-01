import Field, { BaseOptions } from "./field.ts";
import { File } from "../collections/files.ts";
import Folder from "../collections/folder.ts";

export interface Options extends BaseOptions {
  collection: string;
  value_field: string;
  search_fields: string[];
  file?: string;
  display_fields?: string[];
  default?: string;
  multiple?: boolean;
  min?: number;
  max?: number;
  options_length?: number;
}

export default class Relation extends Field<Options> {
  static defaults: Options = {
    collection: "",
    value_field: "",
    search_fields: [],
  };
  widget = "relation";

  constructor(
    label: string,
    config: Options = structuredClone(Relation.defaults),
  ) {
    super(label, config);
  }

  /** Relate automatically with a folder/file collection */
  target(
    collection: File | Folder,
    valueField: string,
    searchFields?: string[],
  ): this {
    if (collection instanceof File) {
      const parent = collection.parent;

      if (!parent) {
        throw new Error("File must be a child of a Files collection");
      }

      const { file, fields } = collection.config;
      this.config.file = file;
      this.config.collection = parent?.getName();
      this.config.search_fields = searchFields || [fields[0].getName()];
      this.config.value_field = valueField;
      return this;
    }

    if (collection instanceof Folder) {
      this.config.collection = collection.getName();
      this.config.search_fields = searchFields ||
        [collection.config.fields[0].getName()];
      this.config.value_field = valueField;
      return this;
    }

    throw new Error("Collection must be a File or Folder");
  }

  /** Name of the referenced collection */
  collection(value: string): this {
    this.config.collection = value;
    return this;
  }

  /**
   * Name of the field from the referenced collection whose value will be stored for the relation.
   * For nested fields, separate each subfield with a . (e.g. name.first). For list fields use a wildcard * to target all list items (e.g. categories.*).
   */
  valueField(value: string): this {
    this.config.value_field = value;
    return this;
  }

  /**
   * List of one or more names of fields in the referenced collection to search for the typed value.
   * Syntax to reference nested fields is similar to that of value_field.
   */
  searchFields(value: string[]): this {
    this.config.search_fields = value;
    return this;
  }

  /** Allows referencing a specific file when the referenced collection is a files collection (string) */
  file(value: string): this {
    this.config.file = value;
    return this;
  }

  /**
   * List of one or more names of fields in the referenced collection that will render in the autocomplete menu of the control.
   * Defaults to value_field. Syntax to reference nested fields is similar to that of value_field.
   */
  displayFields(value: string[]): this {
    this.config.display_fields = value;
    return this;
  }

  /** Accepts any widget data type; defaults to an empty string */
  default(value: string): this {
    this.config.default = value;
    return this;
  }

  /** Accepts a boolean, defaults to false */
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

  /**
   * Accepts integer to override number of options presented to user.
   * Defaults to 20.
   */
  optionsLength(value: number): this {
    this.config.options_length = value;
    return this;
  }
}

export const defaults = new Relation("Defaults", Relation.defaults);
