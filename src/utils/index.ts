import { REGEXP_META_CHARS } from '../consts';
import { Transformer } from '../interfaces';

export const createCellRegexp = (delimiter: string): RegExp => {
  delimiter = escapeMetaChars(delimiter);
  const cellReg = `("?)((?:[^"]|"")*?)\\1`;
  const spaceWithoutNewLine = "(?:(?!\\n)\\s)*";
  // isure: \s can match \n
  return new RegExp(
    `${spaceWithoutNewLine}${cellReg}` +
    `${spaceWithoutNewLine}(?:${delimiter}|(?=\\r?\\n)|$)`, 'gm'
  );
}

export const escapeMetaChars = (text: string): string => {
  const res = [];
  for (let char of text) {
    if (REGEXP_META_CHARS.includes(char)) {
      res.push(`\${char}`);
    } else {
      res.push(char);
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

export function isArrayEmpty(arr: any[]) {
  return arr.length === 0 || arr.every(item => item === '' || item == null);
}