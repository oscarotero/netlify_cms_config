import config from "./config.ts";
import {
  assertSnapshot,
  SnapshotOptions,
} from "https://deno.land/std@0.141.0/testing/snapshot.ts";

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
  console.log(config.collections);
  await assertSnapshot(context, config, options);
});
