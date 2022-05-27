import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  default?: string;
  media_library?: {
    allow_multiple?: boolean;
    config?: Record<string, unknown>;
    media_folder?: string;
    choose_url?: boolean;
  };
}

export default class File extends Field {
  static defaults: Options = {};
  widget = "file";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(File.defaults);
  }

  /** Accepts a file path string */
  default(path: string): this {
    this.config.default = path;
    return this;
  }

  /**
   * When set to false, prevents multiple selection for any media library extension,
   * but must be supported by the extension in use.
   */
  allowMultiple(allow_multiple = true): this {
    const { media_library = {} } = this.config;
    media_library.allow_multiple = allow_multiple;
    this.config.media_library = media_library;
    return this;
  }

  /**
   * A configuration object that will be passed directly to the media library being used.
   * Available options are determined by the library
   */
  mediaConfig(config: Record<string, unknown>): this {
    const { media_library = {} } = this.config;
    media_library.config = config;
    this.config.media_library = media_library;
    return this;
  }

  /**
   * File path where uploaded files will be saved specific to this control.
   * Paths can be relative to a collection folder (e.g. files will add the file to a sub-folder in the collection folder)
   * or absolute with reference to the base of the repo which needs to begin with / (e.g /static/files will save uploaded files to the static folder in a sub folder named files)
   */
  mediaFolder(media_folder: string): this {
    const { media_library = {} } = this.config;
    media_library.media_folder = media_folder;
    this.config.media_library = media_library;
    return this;
  }

  /** When set to false, the "Insert from URL" button will be hidden */
  chooseUrl(choose_url = true): this {
    const { media_library = {} } = this.config;
    media_library.choose_url = choose_url;
    this.config.media_library = media_library;
    return this;
  }
}
