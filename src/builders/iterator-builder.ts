import { Builder } from "../interfaces";
import { isArrayEmpty } from "../utils";

interface IteratorBuilderOption {
  limit?: number;
}
export class IteratorBuilder implements Builder {
  limit: number;
  next: (() => void) | null = null;

  tempRow: any[] = [];
  isEnd = false;
  fetchedRows: number = 0;

  constructor(option: IteratorBuilderOption) {
    this.limit = option?.limit || Infinity;
  }

  onEnd() {
    this.isEnd = true;
  }

  onCell(cell: any) {
    this.tempRow.push(cell);
  }

  onRowEnd(next: () => void) {
    this.fetchedRows++;
    if (this.fetchedRows >= this.limit) {
      this.isEnd = true;
    }

    this.next = next;
  }

  getResult() {
    const self = this;
    return {
      *[Symbol.iterator]() {
        while(!self.isEnd) {
          yield self.tempRow.slice();
          self.tempRow = [];
          self.next && self.next();
        }

        if (!isArrayEmpty(self.tempRow)) {
          yield self.tempRow.slice();
        }
      }
    };
  }
}