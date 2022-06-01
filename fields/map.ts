import Field, { BaseOptions } from "./field.ts";

export interface Options extends BaseOptions {
  decimals?: number;
  default?: string;
  type?: "Point" | "LineString" | "Polygon";
}

export default class Map extends Field<Options> {
  static defaults: Options = {};
  widget = "map";

  constructor(label: string, config: Options = structuredClone(Map.defaults)) {
    super(label, config);
  }

  /**
   * Accepts a number to specify precision of saved coordinates.
   * defaults to 7 decimals
   */
  decimals(value: number): this {
    this.config.decimals = value;
    return this;
  }

  /** Accepts a GeoJSON string containing a single geometry. */
  default(value: string): this {
    this.config.default = value;
    return this;
  }

  /**
   * Accepts one string value of Point, LineString or Polygon.
   * Defaults to Point
   */
  type(value: "Point" | "LineString" | "Polygon"): this {
    this.config.type = value;
    return this;
  }
}

export const defaults = new Map("Defaults", Map.defaults);
