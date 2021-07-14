
export interface ParserOption {
  delimiter?: string;
  builder?: Builder;
}

export interface Builder {

  limit: number | null;

  onCell: (cell: any) => void;


  /**
   * invoked when a row ended.
   *
   * @returns {boolean} whether continue to parse.
   */
  onRowEnd: (next: () => void) => void;

  onEnd: () => void;

  getResult: () => any;
}

export interface ParsedResult {
  type: 'cell' | 'row' | null;
  value?: string;
}

export interface Transformer {
  transform: (cell: any) => any;
}