import { parse } from 'path';
import { parse as parseEnv, toPrefix } from './env';
import { merge } from './merge';
import { Options } from './options';
import { defaultPaths, defaultParsers } from './defaults';
import { load as loadFile, loadSync as loadFileSync } from './load';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function load<T = any>(options?: Options<T>): Promise<T> {
  let name = options?.name || process.env.npm_package_name || parse(process.cwd()).name;
  let filename = options?.filename || name;
  const defaults = options?.defaults || {};
  const paths = options?.paths || defaultPaths;
  const parsers = options?.parsers || defaultParsers;
  const mergeArray = options?.mergeArray === undefined ? false : options.mergeArray;
  const mergeFiles = options?.mergeFiles || 'first';

  name = typeof name === 'function' ? name() : name;
  filename = typeof filename === 'function' ? filename() : filename;

  const loaded = await loadFile<T>(
    filename,
    paths.map((fn) => fn(name as string)),
    parsers,
    mergeFiles !== 'first',
  );

  if (mergeFiles === 'error' && loaded.length > 1) {
    throw new Error("`options.mergeFiles` is set to 'error', but multiple files were found!");
  }

  const env = parseEnv<T>(toPrefix(name));

  return merge(defaults, [...loaded, env], { mergeArray });
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function loadSync<T = any>(options?: Options<T>): T {
  let name = options?.name || process.env.npm_package_name || parse(process.cwd()).name;
  let filename = options?.filename || name;
  const defaults = options?.defaults || {};
  const paths = options?.paths || defaultPaths;
  const parsers = options?.parsers || defaultParsers;
  const mergeArray = options?.mergeArray === undefined ? false : options.mergeArray;
  const mergeFiles = options?.mergeFiles || 'first';

  name = typeof name === 'function' ? name() : name;
  filename = typeof filename === 'function' ? filename() : filename;

  const loaded = loadFileSync<T>(
    filename,
    paths.map((fn) => fn(name as string)),
    parsers,
    mergeFiles !== 'first',
  );

  if (mergeFiles === 'error' && loaded.length > 1) {
    throw new Error("`options.mergeFiles` is set to 'error', but multiple files were found!");
  }

  const env = parseEnv<T>(toPrefix(name));

  return merge(defaults, [...loaded, env], { mergeArray });
}

export default loadSync;
