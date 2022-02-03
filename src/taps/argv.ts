// eslint-disable-next-line @typescript-eslint/no-var-requires
const parse = require('args-parser');
import { Callable, ifCallable, unflatten } from '../util';
import { ParserSync, Tap } from './base';

export type ArgvOptions = {
  argv: string[];

  separator: string;
};

export class ArgvTap extends Tap<Partial<Callable<ArgvOptions>>> implements ParserSync {
  private get argv() {
    return ifCallable(this.options?.argv ?? process.argv);
  }

  private get separator() {
    return ifCallable(this.options?.separator ?? '__');
  }

  parseSync<T>(): Partial<T> {
    return unflatten(parse(this.argv), this.separator) as Partial<T>;
  }
}
