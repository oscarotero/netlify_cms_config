import Field, { Options as Commons } from "./field.ts";

export type Button =
  | "bold"
  | "italic"
  | "code"
  | "link"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "heading-four"
  | "heading-five"
  | "heading-six"
  | "quote"
  | "bulleted-list"
  | "numbered-list";
export type Mode = "raw" | "rich-text";
export type Component = "image" | "code-block";

export interface Options extends Commons {
  default?: string;
  minimal?: boolean;
  buttons?: Button[];
  editor_components?: Component[];
  modes?: Mode[];
  sanitize_preview?: boolean;
}

export default class Markdown extends Field {
  static defaults: Options = {};
  widget = "markdown";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Markdown.defaults);
  }

  /** Accepts markdown content */
  default(value: string): this {
    this.config.default = value;
    return this;
  }

  /**
   * Sets the widget height to minimum possible.
   * False by default
   */
  minimal(value = true): this {
    this.config.minimal = value;
    return this;
  }

  /** An array of strings representing the formatting buttons to display (all shown by default). */
  buttons(value: Button[]): this {
    this.config.buttons = value;
    return this;
  }

  /**
   * An array of strings representing the names of editor components to display (all shown by default).
   * Netlify CMS includes image and code-block editor components by default, and custom components may be created and registered.
   */
  editorComponents(value: Component[]): this {
    this.config.editor_components = value;
    return this;
  }

  /**
   * An array of strings representing the names of allowed editor modes.
   * A toggle button appears in the toolbar when more than one mode is available.
   */
  modes(value: Mode[]): this {
    this.config.modes = value;
    return this;
  }

  /** Sanitizes markdown preview to prevent XSS attacks - might alter the preview content. */
  sanitizePreview(value = true): this {
    this.config.sanitize_preview = value;
    return this;
  }
}
