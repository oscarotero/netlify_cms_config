import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  default?: string;
  format?: string;
  date_format?: string | boolean;
  time_format?: string | boolean;
  picker_utc?: boolean;
}

export default class DateTime extends Field<Options> {
  static defaults: Options = {};
  widget = "datetime";

  constructor(
    label: string,
    config: Options = structuredClone(DateTime.defaults),
  ) {
    super(label, config);
  }

  /**
   * Accepts a datetime string, or an empty string to accept blank input.
   * Otherwise defaults to current datetime
   */
  default(date: string): this {
    this.config.default = date;
    return this;
  }

  /**
   * Sets storage format; accepts Moment.js tokens.
   * Defaults to raw Date object (if supported by output format)
   */
  format(format: string): this {
    this.config.format = format;
    return this;
  }

  /**
   * Sets date display format in UI.
   * boolean or Moment.js tokens.
   * If true use default locale format.
   */
  dateFormat(date_format: string | boolean): this {
    this.config.date_format = date_format;
    return this;
  }

  /**
   * Sets time display format in UI; boolean or Moment.js tokens.
   * If true use default locale format, false hides time-picker.
   */
  timeFormat(time_format: string | boolean): this {
    this.config.time_format = time_format;
    return this;
  }

  /**
   * When set to true, the datetime picker will display times in UTC.
   * When false, the datetime picker will display times in the user's local timezone.
   * When using date-only formats, it can be helpful to set this to true so users in all timezones will see the same date in the datetime picker.
   */
  pickerUtc(picker_utc = true): this {
    this.config.picker_utc = picker_utc;
    return this;
  }
}

export const defaults = new DateTime("Defaults", DateTime.defaults);
