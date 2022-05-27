import Boolean from "./fields/boolean.ts";
import Code from "./fields/code.ts";
import Color from "./fields/color.ts";
import DateTime from "./fields/datetime.ts";
import Field from "./fields/field.ts";
import File from "./fields/file.ts";
import Hidden from "./fields/hidden.ts";
import Image from "./fields/image.ts";
import List from "./fields/list.ts";
import Map from "./fields/map.ts";
import Markdown from "./fields/markdown.ts";
import Number from "./fields/number.ts";
import ObjectField from "./fields/object.ts";
import Relation from "./fields/relation.ts";
import Select, { Option as SelectOption } from "./fields/select.ts";
import String from "./fields/string.ts";
import Text from "./fields/text.ts";
import Files, { File as FileCollection } from "./collections/files.ts";
import Folder from "./collections/folder.ts";

export {
  Boolean,
  Code,
  Color,
  DateTime,
  Field,
  File,
  Hidden,
  Image,
  List,
  Map,
  Markdown,
  Number,
  ObjectField as Object,
  Relation,
  Select,
  String,
  Text,
};

const factory = {
  /** Configure individual default settings for every field */
  defaults: {
    boolean: Boolean.defaults,
    code: Code.defaults,
    color: Color.defaults,
    datetime: DateTime.defaults,
    file: File.defaults,
    hidden: Hidden.defaults,
    image: Image.defaults,
    list: List.defaults,
    map: Map.defaults,
    markdown: Markdown.defaults,
    number: Number.defaults,
    object: ObjectField.defaults,
    relation: Relation.defaults,
    select: Select.defaults,
    string: String.defaults,
    text: Text.defaults,
  },

  /** Set the default `required` option for all fields */
  set defaultRequired(required: boolean) {
    Object.values(this.defaults).forEach((field) => {
      field.required = required;
    });
  },

  /**
   * A files collection contains one or more uniquely configured files.
   * Unlike items in folder collections, which repeat the same configuration over all files in the folder, each item in a files collection has an explicitly set path, filename, and configuration.
   * This can be useful for unique files with a custom set of fields, like a settings file or a custom landing page with a unique content structure.
   * @see https://www.netlifycms.org/docs/collection-types/#file-collections
   */
  files(label: string): Files {
    return new Files(label);
  },

  /**
   * Folder collections represent one or more files with the same format, fields, and configuration options, all stored within the same folder in the repository.
   * You might use a folder collection for blog posts, product pages, author data files, etc.
   * Unlike file collections, folder collections have the option to allow editors to create new items in the collection.
   * @see https://www.netlifycms.org/docs/collection-types/#folder-collections
   */
  folder(label: string, folder: string, fields: Field[] = []): Folder {
    return new Folder(label).folder(folder).fields(fields);
  },

  /**
   * The boolean widget translates a toggle switch input to a true/false value.
   * @see https://www.netlifycms.org/docs/widgets/#boolean
   */
  boolean(label: string): Boolean {
    return new Boolean(label);
  },

  /**
   * The code widget provides a code editor (powered by Codemirror) with optional syntax awareness.
   * Can output the raw code value or an object with the selected language and the raw code value.
   * @see https://www.netlifycms.org/docs/widgets/#code
   */
  code(label: string): Code {
    return new Code(label);
  },

  /**
   * The color widget translates a color picker to a color string.
   * @see https://www.netlifycms.org/docs/widgets/#color
   */
  color(label: string): Color {
    return new Color(label);
  },

  /**
   * The datetime widget translates a datetime picker to a datetime string.
   * @see https://www.netlifycms.org/docs/widgets/#datetime
   */
  datetime(label: string): DateTime {
    return new DateTime(label);
  },

  /**
   * The file widget allows editors to upload a file or select an existing one from the media library.
   * The path to the file will be saved to the field as a string.
   * @see https://www.netlifycms.org/docs/widgets/#file
   */
  file(label: string): File {
    return new File(label);
  },

  /**
   * Hidden widgets do not display in the UI.
   * In folder collections that allow users to create new items, you will often want to set a default for hidden fields,
   * so they will be set without requiring an input.
   * @see https://www.netlifycms.org/docs/widgets/#hidden
   */
  hidden(label: string, value?: unknown): Hidden {
    const field = new Hidden(label);

    if (value !== undefined) {
      field.default(value);
    }

    return field;
  },

  /**
   * The image widget allows editors to upload an image or select an existing one from the media library.
   * The path to the image file will be saved to the field as a string.
   * @see https://www.netlifycms.org/docs/widgets/#image
   */
  image(label: string): Image {
    return new Image(label);
  },

  /**
   * The list widget allows you to create a repeatable item in the UI which saves as a list of widget values.
   * Map a user-provided string with a comma delimiter into a list.
   * You can choose any widget as a child of a list widget—even other lists.
   * @see https://www.netlifycms.org/docs/widgets/#list
   */
  list(label: string, fields?: Field | Field[]): List {
    const field = new List(label);

    if (fields) {
      field.fields(fields);
    }

    return field;
  },

  /**
   * The map widget allows you to edit spatial data using an interactive map. Spatial data for a single piece of geometry saves as a GeoJSON string in WGS84 projection.
   * @see https://www.netlifycms.org/docs/widgets/#map
   */
  map(label: string): Map {
    return new Map(label);
  },

  /**
   * The markdown widget provides a full fledged text editor allowing users to format text with features such as headings and blockquotes. Users can change their editing view with a handy toggle button.
   * Please note: If you want to use your markdown editor to fill a markdown file contents after its frontmatter, you'll have to name the field body so the CMS recognizes it and saves the file accordingly.
   * @see https://www.netlifycms.org/docs/widgets/#markdown
   */
  markdown(label: string): Markdown {
    return new Markdown(label);
  },

  /**
   * The number widget uses an HTML number input, saving the value as a string, integer, or floating point number.
   * @see https://www.netlifycms.org/docs/widgets/#number
   */
  number(label: string): Number {
    return new Number(label);
  },

  /**
   * The object widget allows you to group multiple widgets together, nested under a single field.
   * You can choose any widget as a child of an object widget—even other objects.
   * @see https://www.netlifycms.org/docs/widgets/#object
   */
  object(label: string, fields: Field[]): ObjectField {
    return new ObjectField(label).fields(fields);
  },

  /**
   * The relation widget allows you to reference items from another collection.
   * It provides a search input with a list of entries from the collection you're referencing, and the list automatically updates with matched entries based on what you've typed.
   * @see https://www.netlifycms.org/docs/widgets/#relation
   */
  relation(
    label: string,
    target?: Folder | FileCollection,
    id?: string,
    searchFields?: string[],
  ): Relation {
    const relation = new Relation(label);

    if (target) {
      if (!id) {
        throw new Error("Relation target must have an id");
      }
      relation.target(target, id, searchFields);
    }

    return relation;
  },

  /**
   * The select widget allows you to pick a string value from a dropdown menu.
   * @see https://www.netlifycms.org/docs/widgets/#select
   */
  select(label: string, options: SelectOption[] = []): Select {
    return new Select(label).options(options);
  },

  /**
   * The string widget translates a basic text input to a string value.
   * For larger textarea inputs, use the text widget.
   * @see https://www.netlifycms.org/docs/widgets/#string
   */
  string(label: string): String {
    return new String(label);
  },

  /**
   * The text widget takes a multiline text field and saves it as a string.
   * For shorter text inputs, use the string widget.
   * @see https://www.netlifycms.org/docs/widgets/#text
   */
  text(label: string): Text {
    return new Text(label);
  },
};

export default factory;
