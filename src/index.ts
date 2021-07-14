import { Parser } from "./parser";
import { SyncBuilder } from './builders/sync-builder';

export function parse(text: string, option?: {limit?: number, delimiter?: string}) {
  option = option || {};
  const builder = new SyncBuilder({
    limit: option.limit || Infinity,
  });

  new Parser({
    builder,
    delimiter: option.delimiter,
  }).parse(text);

  return builder.getResult();
}

export function parseIterable() {
  // TODO: implemented based on IteratorBUilder
}
