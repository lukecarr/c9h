import { Options } from '../options';

export abstract class Tap<T = unknown> {
  protected options: T | undefined;

  constructor(options?: T) {
    this.options = options;
  }
}

export interface Parser {
  parse<T>(c9hOptions: Options): Promise<Partial<T>>;
}

export interface ParserSync {
  parseSync<T>(c9hOptions: Options): Partial<T>;
}
