import { Options } from '../options';

export abstract class Tap<T = unknown> {
  protected options: T | undefined;

  constructor(options?: T) {
    this.options = options;
  }
}

export interface Parser {
  parse(c9hOptions: Options): Promise<unknown>;
}

export interface ParserSync {
  parseSync(c9hOptions: Options): unknown;
}
