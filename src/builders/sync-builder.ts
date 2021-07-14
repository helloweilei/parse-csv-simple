import { Builder } from '../interfaces';
import { isArrayEmpty } from '../utils';

interface SyncBuilderOption {
  limit: number;
  [key: string]: any;
}
export class SyncBuilder implements Builder {

  limit: number;
  private result: any[][] = [];
  private tempRow: any[] = [];
  isEnd = false;

  constructor(opt?: SyncBuilderOption) {
    this.limit = opt?.limit || Infinity;
  }

  onCell(cell: any) {
    this.tempRow.push(cell);
  }

  onRowEnd(next: () => void): void {
    if (this.result.length >= this.limit || this.isEnd) {
      return;
    }

    this.result.push(this.tempRow);
    this.tempRow = [];

    next();

  }

  onEnd() {
    this.isEnd = true;
    if (!isArrayEmpty(this.tempRow)) {
      this.result.push(this.tempRow);
      this.tempRow = [];
    }
  }

  getResult() {
    return this.result.slice();
  }
}