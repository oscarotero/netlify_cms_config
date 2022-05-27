export interface ViewFilter {
  label: string;
  field: string;
  pattern: string | boolean;
}

export interface ViewGroups {
  label: string;
  field: string;
  pattern?: string | boolean;
}

export interface Options {
  name?: string;
  description?: string;
  label_singular?: string;
  publish?: boolean;
  hide?: boolean;
  delete?: boolean;
  sortable_fields?: string[];
  view_filters?: ViewFilter[];
  view_groups?: ViewGroups[];
  editor?: {
    preview?: boolean;
  };
}

export default class Collection {
  label: string;
  config: Options = {};

  constructor(label: string) {
    this.label = label;
  }

  /** Get the current name */
  getName(): string {
    return this.config.name || this.label.toLowerCase().replaceAll(" ", "_");
  }

  /** Change the collection name */
  name(name: string): this {
    this.config.name = name;
    return this;
  }

  /** Optional text, displayed below the label when viewing a collection */
  description(description: string): this {
    this.config.description = description;
    return this;
  }

  /** Singular label for certain elements in the editor; defaults to the value of label */
  labelSingular(label: string): this {
    this.config.label_singular = label;
    return this;
  }

  /**
   * For publish_mode: editorial_workflow only:
   * false hides UI publishing controls for a collection.
   * defaults to true
   */
  publish(publish = true): this {
    this.config.publish = publish;
    return this;
  }

  /**
   * To hides a collection in the CMS UI.
   * Useful when using the relation widget to hide referenced
   */
  hide(hide = true): this {
    this.config.hide = hide;
    return this;
  }

  /**
   * list of sort fields to show in the UI.
   * Defaults to inferring title, date, author and description fields and will also show Update On sort field in git based backends.
   * When author field can't be inferred commit author will be used.
   */
  sortableFields(...fields: string[]): this {
    this.config.sortable_fields = fields;
    return this;
  }

  /** Set to false to disable the preview pane for this collection or file. */
  preview(preview = true): this {
    this.config.editor = { preview };
    return this;
  }

  /** Add a predefined view filters to show in the UI. */
  viewFilter(label: string, field: string, pattern: string | boolean): this {
    const filters = this.config.view_filters || [];
    filters.push({ label, field, pattern });
    this.config.view_filters = filters;
    return this;
  }

  /** Add a predefined group filters to show in the UI. */
  viewGroup(label: string, field: string, pattern: string | boolean): this {
    const filters = this.config.view_groups || [];
    filters.push({ label, field, pattern });
    this.config.view_groups = filters;
    return this;
  }

  /** Return the collection as JSON */
  toJSON(): Record<string, unknown> {
    return {
      label: this.label,
      name: this.getName(),
      ...this.config,
    };
  }
}
