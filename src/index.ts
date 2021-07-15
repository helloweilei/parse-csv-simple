import { Parser } from "./parser";
import { SyncBuilder } from './builders/sync-builder';
import { Builder } from "./interfaces";
import { IteratorBuilder } from "./builders/iterator-builder";

function _parse(text: string, option: {delimiter?: string, builder: Builder}) {
  new Parser({
    builder: option.builder,
    delimiter: option.delimiter,
  }).parse(text);

  return option.builder.getResult();
}

export function parse(text: string, option?: {limit?: number, delimiter?: string}) {
  return _parse(text, {
    delimiter: option?.delimiter,
    builder: new SyncBuilder({
      limit: option?.limit || Infinity,
    }),
  });
}

export function parseIterable(text: string, option?: {limit?: number, delimiter?: string}) {
  return _parse(text, {
    delimiter: option?.delimiter,
    builder: new IteratorBuilder({
      limit: option?.limit || Infinity,
    }),
  });
}
