import Field, { Options as Commons } from "./field.ts";

export interface Options extends Commons {
  decimals?: number;
  default?: string;
  type?: "Point" | "LineString" | "Polygon";
}

export default class Map extends Field {
  static defaults: Options = {};
  widget = "map";
  config: Options;

  constructor(label: string) {
    super(label);
    this.config = structuredClone(Map.defaults);
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
