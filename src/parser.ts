import { ParserOption, Builder } from './interfaces';

export class Parser {

  private delimiter: string;
  private position = 0;
  private builder: Builder | null = null;
  private content = '';

  constructor(option?: ParserOption) {
    this.delimiter = option?.delimiter || ',';
  }

  private advance(): boolean {
    return false;
  }

  parse(text?: string) {
    if (text) {
      this.content = text;
    }
    this.advance();
  }

  setBuilder(builder: Builder) {
    this.builder = builder;
    this.position = 0;
  }
}