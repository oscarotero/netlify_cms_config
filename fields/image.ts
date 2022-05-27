import File, { Options as FileOptions } from "./file.ts";

export type Options = FileOptions;

export default class Image extends File {
  widget = "image";
  config: Options = {
    media_library: {},
  };
}
