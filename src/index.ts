import { parse } from 'path';
import { Options } from './options';
import { Parser, ParserSync, Tap } from './taps/base';
import { DEFAULT_TAPS } from './taps';
import { Callable, ifCallable, merge } from './utils';

export type LoadOptions<T> = {
  options: Partial<Callable<Options>>;
  taps: Tap[];
  defaults: Partial<T>;
};

export async function load<T = unknown>(options?: Partial<LoadOptions<T>>): Promise<Partial<T>> {
  const name = ifCallable(options?.options?.name ?? process.env.npm_package_name ?? parse(process.cwd()).name);
  const mergeOptions = ifCallable(options?.options?.merge ?? { array: true });
  const taps = options?.taps || DEFAULT_TAPS;

  const loaded = [];

  for (const tap of taps) {
    if ('parse' in tap) {
      loaded.push(await (tap as unknown as Parser).parse<T>({ name, merge: mergeOptions }));
    } else if ('parseSync' in tap) {
      loaded.push((tap as unknown as ParserSync).parseSync<T>({ name, merge: mergeOptions }));
    }
  }

  return merge(options?.defaults ?? {}, loaded, mergeOptions);
}

export function loadSync<T = unknown>(options?: Partial<LoadOptions<T>>): Partial<T> {
  const name = ifCallable(options?.options?.name ?? process.env.npm_package_name ?? parse(process.cwd()).name);
  const mergeOptions = ifCallable(options?.options?.merge ?? { array: true });
  const taps = options?.taps || DEFAULT_TAPS;

  const loaded = [];

  for (const tap of taps) {
    if ('parseSync' in tap) {
      loaded.push((tap as unknown as ParserSync).parseSync<T>({ name, merge: mergeOptions }));
    }
  }

  return merge(options?.defaults ?? {}, loaded, mergeOptions);
}

export default loadSync;
