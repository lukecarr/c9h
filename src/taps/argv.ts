// eslint-disable-next-line @typescript-eslint/no-var-requires
const parse = require('args-parser');
import { Callable, ifCallable, unflatten } from '../utils';
import { ParserSync, Tap } from './base';

export type ArgvOptions = Partial<
  Callable<{
    argv: string[];

    argTransformer: string | ((key: string) => string[]);
  }>
>;

export class ArgvTap extends Tap<ArgvOptions | undefined> implements ParserSync {
  constructor(options?: ArgvOptions) {
    super(options);
  }

  private get argv() {
    return ifCallable(this.options?.argv ?? process.argv);
  }

  private get argTransformer() {
    const transformer = ifCallable<undefined | string | ((key: string) => string[])>(this.options?.argTransformer);

    if (typeof transformer === 'undefined' || typeof transformer === 'string') {
      return (key: string) => key.toLocaleLowerCase().split(transformer ?? '__');
    }

    return transformer;
  }

  parseSync<T>(): Partial<T> {
    return unflatten(parse(this.argv), this.argTransformer) as Partial<T>;
  }
}
