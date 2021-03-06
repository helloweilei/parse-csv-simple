import { ParserOption, Builder, Transformer, ParsedResult } from './interfaces';
import { createCellRegexp, composeTransformer } from './utils';

export class Parser {

  private delimiter: string;
  private position = 0;
  private builder: Builder | null;
  private content = '';

  private transformers: Transformer[] = [];

  constructor(option?: ParserOption) {
    this.delimiter = option?.delimiter || ',';
    this.builder = option?.builder || null;
  }

  private * iterateContent(): Generator<ParsedResult> {
    const cellReg = createCellRegexp(this.delimiter);
    const content = this.content;
    const len = content.length;
    const ROW_REG = /\r?\n/;
    let match;
    while (this.position < len) {
      cellReg.lastIndex = this.position;
      if ((match = cellReg.exec(content)) && match[0].length > 0) {
        this.position += match[0].length;
        yield { type: 'cell', value: match[2] };
      } else if (match = ROW_REG.exec(content)) {
        this.position += match[0].length;
        yield { type: 'row' };
      } else {
        throw Error(`Invalid format`);
      }
    }
  }

  addTransformer(transformer: Transformer) {
    this.transformers.push(transformer);
  }

  parse(text?: string) {
    if (text) {
      this.content = text;
    }
    if (this.builder === null) {
      throw Error(`No builder provided.`);
    }
    const transform = this.transform;
    const iterator = this.iterateContent();
    const builder = this.builder;

    const next = () => {
      const result = iterator.next();
      if (result.done) {
        builder.onEnd();
        return;
      }

      if (result.value.type === 'cell') {
        const cell = transform(result.value.value);
        builder.onCell(cell);
        next();
      } else if (result.value.type === 'row') {
        builder.onRowEnd(next);
      }
    }

    next();
  }

  setBuilder(builder: Builder) {
    this.builder = builder;
    this.position = 0;

    return this;
  }

  get transform(): (cell?: string) => any {
    return (cell?: string) => {
      if (cell === undefined) {
        return '';
      }
      return composeTransformer(this.transformers)(cell);
    }
  }
}