import Collection, { BaseOptions } from "./collection.ts";
import type Field from "../fields/field.ts";

export interface Options extends BaseOptions {
  folder?: string;
  fields: Field[];
  create?: boolean;
  slug?: string;
  identifier_field?: string;
  media_folder?: string;
  public_folder?: string;
  filter?: {
    field: string;
    value: string;
  };
}

export default class Folder extends Collection<Options> {
  static defaults: Options = {
    fields: [],
  };

  constructor(
    label: string,
    config: Options = structuredClone(Folder.defaults),
  ) {
    super(label, config);
  }

  /** Set the folder name containing the collection files */
  folder(folder: string): this {
    this.config.folder = folder;
    return this;
  }

  /** Default media folder for the collection. */
  mediaFolder(media_folder: string): this {
    this.config.media_folder = media_folder;
    return this;
  }

  /** Default public folder for the collection. */
  publicFolder(public_folder: string): this {
    this.config.public_folder = public_folder;
    return this;
  }

  /** Set the fields to be displayed in the collection */
  fields(fields: Field[]): this {
    this.config.fields = fields;
    return this;
  }

  /**
   * Set the field to be used as the identifier for the collection
   * By default is "title"
   */
  identifierField(field: string): this {
    this.config.identifier_field = field;
    return this;
  }

  /** Set the filter to be used to filter the collection */
  filter(field: string, value: string): this {
    this.config.filter = {
      field,
      value,
    };
    return this;
  }

  /** Set the create option to be used to create new items in the collection */
  create(create = true): this {
    this.config.create = create;
    return this;
  }

  /**
   * The slug option specifies a template for generating new filenames based on a file's creation date and title field. (This means that all collections with create: true must have a title field (a different field can be used via identifier_field).
   * The slug template can also reference a field value by name, eg. {{title}}. If a field name conflicts with a built in template tag name - for example, if you have a field named slug, and would like to reference that field via {{slug}}, you can do so by adding the explicit fields. prefix, eg. {{fields.slug}}.
   * Available template tags:
   *
   * Any field can be referenced by wrapping the field name in double curly braces, eg. {{author}}
   * {{slug}}: a url-safe version of the title field (or identifier field) for the file
   * {{year}}: 4-digit year of the file creation date
   * {{month}}: 2-digit month of the file creation date
   * {{day}}: 2-digit day of the month of the file creation date
   * {{hour}}: 2-digit hour of the file creation date
   * {{minute}}: 2-digit minute of the file creation date
   * {{second}}: 2-digit second of the file creation date
   */
  slug(slug: string): this {
    this.config.slug = slug;
    return this;
  }

  /** Prevents users from deleting items in a collection. Defaults to true */
  delete(del = true): this {
    this.config.delete = del;
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
