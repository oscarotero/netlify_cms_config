import config from "./config.ts";
import {
  assertSnapshot,
  SnapshotOptions,
} from "https://deno.land/std@0.141.0/testing/snapshot.ts";
import { stringify } from "https://deno.land/std@0.141.0/encoding/yaml.ts";

const options: SnapshotOptions = {
  serializer(actual: unknown): string {
    return Deno.inspect(actual, {
      depth: Infinity,
      sorted: false,
      trailingComma: true,
      compact: false,
      iterableLimit: Infinity,
      strAbbreviateSize: Infinity,
    }).replace(/\\n/g, "\n");
  },
};

Deno.test("Config generation", async (context) => {
  await assertSnapshot(context, config, options);
  await assertSnapshot(context, stringify(config), options);
});
