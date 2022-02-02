import { Options } from '../options';
import { Callable, ifCallable } from '../util';
import { Parser, ParserSync, Tap } from './base';

export type EnvOptions = {
  prefix: string;

  env: Partial<{
    [key: string]: string;
  }>;

  separator: string;
};

export class EnvTap extends Tap<Partial<Callable<EnvOptions>>> implements Parser, ParserSync {
  private getPrefix(c9hOptions: Options) {
    return ifCallable(this.options?.prefix ?? toPrefix(c9hOptions.name));
  }

  private get env() {
    return ifCallable(this.options?.env ?? process.env ?? {});
  }

  private get separator() {
    return ifCallable(this.options?.separator ?? '_');
  }

  async parse(c9hOptions: Options): Promise<unknown> {
    return this.parseSync(c9hOptions);
  }

  parseSync(c9hOptions: Options): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as any;
    const prefix = this.getPrefix(c9hOptions);

    for (const [key, value] of Object.entries(this.env)) {
      if (!key.startsWith(prefix)) {
        continue;
      }

      const keys = key.replace(prefix, '').toLowerCase().split(this.separator);

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

/**
 * Converts a c9h name to an environment variable prefix. `@`
 * characters are removed, `-` and `/` characters are replaced
 * with `_`, and lowercase letters are converted to uppercase.
 *
 * An error is thrown if any other characters (unsupported) are
 * found in `name`.
 *
 * @param name The c9h name to convert to an env var prefix.
 * @returns The converted name as an env var prefix.
 */
const toPrefix = (name: string): string => {
  // Remove @ chars, and replace - or / with _
  name = name.replace(/[@]/g, '').replace(/[-\/]/g, '_').toUpperCase();

  if (!name.match(/^[A-Z0-9_]+$/)) {
    throw new Error(
      `Invalid characters were provided for c9h name. The name must only include letters, digits, '-', '_', '@', and '/'.`,
    );
  }

  return `${name}_`;
};
