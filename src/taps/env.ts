import { Options } from '../options';
import { Callable, ifCallable, unflatten } from '../util';
import { ParserSync, Tap } from './base';

export type EnvOptions = {
  prefix: string;

  env: Partial<{
    [key: string]: string;
  }>;

  separator: string;
};

export class EnvTap<T> extends Tap<Partial<Callable<EnvOptions>>> implements ParserSync {
  private get env() {
    return ifCallable(this.options?.env ?? process.env ?? {});
  }

  private get separator() {
    return ifCallable(this.options?.separator ?? '__');
  }

  parseSync<T>(c9hOptions: Options): Partial<T> {
    const prefix = ifCallable(this.options?.prefix ?? toPrefix(c9hOptions.name));

    return unflatten(
      Object.fromEntries(
        Object.entries(this.env)
          .filter(([key]) => key.startsWith(prefix))
          .map(([key, val]) => [key.replace(prefix, ''), val]),
      ),
      this.separator,
    ) as Partial<T>;
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
