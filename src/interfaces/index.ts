import { Parser } from "../parser";

export interface ParserOption {
  delimiter?: string;
}

export interface Builder {

  limit: number | null;

  onCell: (cell: string, parser: Parser) => void;


  /**
   * invoked when a new row generated.
   * 
   * @returns {boolean} whether continue to parse.
   */
  onRow: (parser: Parser) => boolean;
}