
export interface ParserOption {
  delimiter?: string;
}

export interface Builder {

  limit: number | null;

  onCell: (cell: any) => void;


  /**
   * invoked when a row ended.
   *
   * @returns {boolean} whether continue to parse.
   */
  onRowEnd: (next: () => void) => boolean;

  onEnd: () => void;
}

export interface ParsedResult {
  type: 'cell' | 'row' | null;
  value?: string;
}

export interface Transformer {
  transform: (cell: any) => any;
}