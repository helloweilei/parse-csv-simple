import { Parser } from "./parser";

export function parse(text: string) {
  return new Parser().parse(text);
}