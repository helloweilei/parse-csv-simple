import { Builder } from "../interfaces";

interface IteratorBuilderOption {
  limit?: number;
}
export class IteratorBuilder implements Builder {
  limit: number;

  constructor(option: IteratorBuilderOption) {
    this.limit = option?.limit || Infinity;
  }

  onEnd() {

  }

  onCell() {

  }

  onRowEnd() {

  }

  getResult() {
    return [];
  }
}