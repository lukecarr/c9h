// eslint-disable-next-line @typescript-eslint/no-var-requires
const parse = require('args-parser');
import { Callable, ifCallable } from 'src/util';
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

  parseSync(): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as any;

    for (const [key, value] of Object.entries(parse(this.argv))) {
      const keys = key.toLowerCase().split(this.separator);

      let current = result;
      let currentKey;

      while ((currentKey = keys.shift())) {
        if (keys.length) {
          current[currentKey] = {};
          current = current[currentKey];
        } else {
          current[currentKey] = value;
        }
      }
    }

    return result;
  }
}
