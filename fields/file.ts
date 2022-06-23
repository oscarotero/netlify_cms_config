import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: string;
  media_library?: Record<string, unknown>;
  allow_multiple?: boolean;
  config?: Record<string, unknown>;
  media_folder?: string;
  choose_url?: boolean;
}

export default class File extends Field<Options> {
  static defaults: Options = {};
  widget = "file";

  constructor(label: string, config: Options = structuredClone(File.defaults)) {
    super(label, config);
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
    this.config.allow_multiple = allow_multiple;
    return this;
  }

  /**
   * A configuration object that will be passed directly to the media library being used.
   * Available options are determined by the library
   */
  mediaConfig(config: Record<string, unknown>): this {
    this.config.config = config;
    return this;
  }

  /**
   * File path where uploaded files will be saved specific to this control.
   * Paths can be relative to a collection folder (e.g. files will add the file to a sub-folder in the collection folder)
   * or absolute with reference to the base of the repo which needs to begin with / (e.g /static/files will save uploaded files to the static folder in a sub folder named files)
   */
  mediaFolder(media_folder: string): this {
    this.config.media_folder = media_folder;
    return this;
  }

  /** When set to false, the "Insert from URL" button will be hidden */
  chooseUrl(choose_url = true): this {
    this.config.choose_url = choose_url;
    return this;
  }
}

export const defaults = new File("Defaults", File.defaults);
