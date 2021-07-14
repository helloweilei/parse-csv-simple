import { REGEXP_META_CHARS } from '../consts';
import { Transformer } from '../interfaces';

export const createCellRegexp = (delimiter: string): RegExp => {
  delimiter = escapeMetaChars(delimiter);
  const commonCell = `(.*?)\\s*${delimiter}`;
  const cellWithQuote = `"(?:([^"]|"")*)"\\s*${delimiter}`;
  return new RegExp(`^\s*(?:${commonCell}|${cellWithQuote})`, 'g');
}

export const escapeMetaChars = (text: string): string => {
  const res = [];
  for (let char of text) {
    if (REGEXP_META_CHARS.includes(char)) {
      res.push(`\${char}`);
    }
  }
  return res.join();
}

export function composeTransformer(transformers: Transformer[]): (cell: string) => any {
  return (cell: string) => {
    return transformers.reduce((prevResult, transformer) => {
      return transformer.transform.call(transformer, prevResult);
    }, cell);
  }
}