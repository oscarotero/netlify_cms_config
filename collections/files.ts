import Collection, { Options as Commons } from "./collection.ts";
import type Field from "../fields/field.ts";

export interface FilesOptions extends Commons {
  files: File[];
}

export default class Files extends Collection {
  static defaults: FilesOptions = {
    files: [],
  };
  config: FilesOptions;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Files.defaults);
  }

  /** Create a new File instance to this collection */
  file(label: string, file: string, fields: Field[]): this {
    this.createFile(label, file, fields);
    return this;
  }

  /** Create a new File instance to this collection and return it */
  createFile(label: string, file: string, fields: Field[]): File {
    const collection = new File(label).file(file).fields(fields);
    collection.parent = this;
    this.config.files.push(collection);
    return collection;
  }

  /**
   * Return the collection as JSON
   */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();

    // Set files to the end of the JSON
    delete json.files;
    json.files = this.config.files.map((field) => field.toJSON());
    return json;
  }
}

export interface FileOptions extends Commons {
  file?: string;
  fields: Field[];
}

export class File extends Collection {
  static defaults: FileOptions = {
    fields: [],
  };
  #parent?: Files;
  config: FileOptions;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(File.defaults);
  }

  set parent(parent: Files | undefined) {
    this.#parent = parent;
  }

  get parent(): Files | undefined {
    return this.#parent;
  }

  /**
   * Maps editor UI widgets to field-value pairs in the saved file.
   * The order of the fields determines their order in the editor UI and in the saved file.
   */
  fields(fields: Field[]): this {
    this.config.fields = fields;
    return this;
  }

  /** Specify the collection file */
  file(file: string): this {
    this.config.file = file;
    return this;
  }

  /** Return the collection as JSON */
  toJSON(): Record<string, unknown> {
    const json = super.toJSON();

    // Set fields to the end of the JSON object
    delete json.fields;
    json.fields = this.config.fields?.map((field) => field.toJSON());
    return json;
  }
}
